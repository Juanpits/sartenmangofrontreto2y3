

function pintarRespuesta(respuesta) {
    // debugger
    $("#resultProducts").empty();

    let myTable = `
  <table class='table table-sm table-responsive' style="height: auto; width: auto">
      <thead>
          <th style='width: auto; background-color: #637007; color: white; ' scope='col'
              align='center'>
              <center>REFERENCIA</center>
          </th>

          <th style='width: auto; background-color: #637007; color: white;' scope='col'
              align='center'>
              <center>MARCA</center>
          </th>

          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center>CATEGORÍA</center>
          </th>

          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center>MATERIALES</center>
          </th>

          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> DIMENSIONES</center>
          </th>
         
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> DESCRIPCIÓN</center>
          </th>

          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> DISPONIBILIDAD</center>
          </th>

          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> PRECIO</center>
          </th>

          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> CANTIDAD</center>
          </th>

          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> FOTOGRAFÍA</center>
          </th>
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> EDITAR</center>
          </th>
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> BORRAR</center>
          </th>
      </thead>
 `;

    if (respuesta.length < 1) {
        myTable += "<td scope='row'>" + "NO HAY PRODUCTOS" + "</td>";
        myTable += "</tr>";
    }
    else {
        // debugger
        for (i = 0; i < respuesta.length; i++) {

            myTable += "<td align='center'>" + respuesta[i].reference + "</td>";
            myTable += "<td align='center'>" + respuesta[i].brand + "</td>";
            myTable += "<td align='center'>" + respuesta[i].category + "</td>";
            myTable += "<td align='center'>" + respuesta[i].materiales + "</td>";
            myTable += "<td align='center'>" + respuesta[i].dimensiones + "</td>";
            myTable += "<td align='center'>" + respuesta[i].description + "</td>";
            myTable += "<td align='center'>" + respuesta[i].availability + "</td>";
            myTable += "<td align='center'>" + respuesta[i].price + "</td>";
            myTable += "<td align='center'>" + respuesta[i].quantity + "</td>";
            myTable += "<td align='center'>" + respuesta[i].photography + "</td>";

            sessionStorage.setItem('reference', respuesta[i].reference)

            

            myTable += "<td align='center'><button data-toggle='modal' data-target='#MymodalUpdate' class='btn btn-outline-success' onclick='consultarProduct(" + respuesta[i].price + ",\"" + respuesta[i].reference + "\")'> <img src='https://image.flaticon.com/icons/png/512/104/104668.png' width='50' height='30'>EDIT</button></td>";

            myTable += "<td align='center'><button class='btn btn-outline-danger' onclick='deleteProduct(" + respuesta[i].price + ",\"" + respuesta[i].reference + "\")'> <img src='https://img.icons8.com/wired/64/000000/filled-trash.png' width='30' height='30'/>DELETE</button></td>";



            myTable += "</tr></tbody>";

            myTable += "</tr>";

        }
    }
    myTable += "</table>";
    $("#resultProducts").append(myTable);
}


async function autoInicioProducts() {
    const $welcome = document.querySelector("#welcome")
    $welcome.textContent = sessionStorage.getItem('nombre');

    try {
        const url = 'http://localhost:8080/api/cookware/all'
        // console.log(url)
        const response = await fetch(url);
        const responseJson = await response.json();
        pintarRespuesta(responseJson);

    } catch (error) {
        console.log("error:", error)
    }
}


async function consultarProduct(price, reference) {
    // sessionStorage.setItem('idUP', id);

    try {
        console.log("entro")

        // debugger
        const url = 'http://localhost:8080/api/cookware/' + reference
        // console.log(url)
        const response = await fetch(url);
        const json = await response.json();

        $("#referenceU").val(json.reference)
        $("#brandU").val(json.brand)
        $("#categoryU").val(json.category)
        $("#materialU").val(json.materiales)
        $("#sizeU").val(json.dimensiones)
        $("#descriptionU").val(json.description)
        $("#priceU").val(json.price)
        $("#quantityU").val(json.quantity)
        $("#photographyU").val(json.photography)

        $('#contador_descriptionU').html(80 - json.description.length + " /80");


        if (json.availability == true) {
            $("#SiAvailabilityU").attr('checked', true);
            $("#NoAvailabilityU").attr('checked', false);
        } else {
            $("#SiAvailabilityU").attr('checked', false);
            $("#NoAvailabilityU").attr('checked', true);
        }

    } catch (error) {
        console.log("error:", error)
    }

}

async function createProduct() {
    // debugger
    if ($("#reference").val().length == 0 ||
        $("#brand").val().length == 0 ||
        $("#category").val().length == 0 ||
        $("#material").val().length == 0 ||
        $("#size").val().length == 0 ||
        $("#description").val().length == 0 ||
        $("#price").val().length == 0 ||
        $("#quantity").val().length == 0 ||
        $("#photography").val().length == 0
    ) {
        alert("TODOS LOS CAMPOS DEBEN ESTAR LLENOS")
    } else {

        try {
            debugger
            let availability;
            const urlUpdate = 'http://localhost:8080/api/cookware/new'
            if ($('input[name="availability"]:checked').val() == 'true') {
                availability = true
            } else {
                availability = false
            }
            const fetchOptions = {
                method: "POST",
                body: JSON.stringify({
                    reference: $("#reference").val(),
                    brand: $("#brand").val(),
                    category: $("#category").val(),
                    materiales: $("#material").val(),
                    dimensiones: $("#size").val(),
                    description: $("#description").val(),
                    availability: availability,
                    price: $("#price").val(),
                    quantity: $("#quantity").val(),
                    photography: $("#photography").val()
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            };
            const responseUpdate = await fetch(urlUpdate, fetchOptions);
            const responseConvertedUpdate = await responseUpdate.json();
            alert("Creado Satisfactoriamente");
            window.location.href = "/Products.html";

        } catch {
            window.location.reload()
            alert("No fué guardado de manera correcta, intente de nuevo");
        }

    }
}

async function updateProduct() {
    if ($("#referenceU").val().length == 0 ||
        $("#brandU").val().length == 0 ||
        $("#categoryU").val().length == 0 ||
        $("#materialU").val().length == 0 ||
        $("#sizeU").val().length == 0 ||
        $("#descriptionU").val().length == 0 ||
        $("#priceU").val().length == 0 ||
        $("#quantityU").val().length == 0 ||
        $("#photographyU").val().length == 0
    ) {
        alert("TODOS LOS CAMPOS DEBEN ESTAR LLENOS")
    } else {
        // debugger
        try {
            let availability;
            // console.log($('input[name="availabilityU"]:checked').val())
            // debugger
            if ($('input[name="availabilityU"]:checked').val() == 'true') {
                availability = true
            } else {
                availability = false
            }

            const urlUpdate = 'http://localhost:8080/api/cookware/update'

            const fetchOptions = {
                method: "PUT",
                body: JSON.stringify({
                    reference: $("#referenceU").val(),
                    brand: $("#brandU").val(),
                    category: $("#categoryU").val(),
                    materiales: $("#materialU").val(),
                    dimensiones: $("#sizeU").val(),
                    description: $("#descriptionU").val(),
                    availability: availability,
                    price: $("#priceU").val(),
                    quantity: $("#quantityU").val(),
                    photography: $("#photographyU").val()
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            };
            const responseUpdate = await fetch(urlUpdate, fetchOptions);
            const responseConvertedUpdate = await responseUpdate.json();
            window.location.href = "/Products.html";

            alert("Actualizado Correctamente");

        } catch {
            window.location.reload()
            alert("No fué actualizado de manera correcta, intente de nuevo");
        }

    }
}

async function deleteProduct(price, reference) {

    try {
       
        const urlUpdate = 'http://localhost:8080/api/cookware/' + reference

        const fetchOptions = {
            method: "DELETE",                      
        };
        const responseUpdate = await fetch(urlUpdate, fetchOptions);
        const responseConvertedUpdate = await responseUpdate.json();
        autoInicioProducts();



    } catch {
        window.location.reload()
        alert("Borrado Satisfactoriamente");
    }


}
