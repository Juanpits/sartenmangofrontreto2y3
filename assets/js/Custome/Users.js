

function pintarRespuesta(respuesta) {
  // debugger
  $("#resultUsers").empty();

  let myTable = `
<table class='table table-sm table-responsive' style="height: auto; width: auto">
    <thead>
        <th style='width: 10%; background-color: #637007; color: white; ' scope='col'
            align='center'>
            <center>ID</center>
        </th>

        <th style='width: auto; background-color: #637007; color: white;' scope='col'
            align='center'>
            <center>IDENTIFICACIÓN</center>
        </th>

        <th style='width: 20%; background-color: #637007; color: white; line-height: 100%'
            scope='col' align='center'>
            <center> NOMBRE</center>
        </th>

        <th style='width: 20%; background-color: #637007; color: white; line-height: 100%'
            scope='col' align='center'>
            <center> DIRECCIÓN</center>
        </th>

        <th style='width: 20%; background-color: #637007; color: white; line-height: 100%'
        scope='col' align='center'>
            <center> NO. CELULAR</center>
        </th>

        <th style='width: 20%; background-color: #637007; color: white; line-height: 100%'
        scope='col' align='center'>
            <center> EMAIL</center>
        </th>
       
        <th style='width: 10%; background-color: #637007; color: white; line-height: 100%'
        scope='col' align='center'>
            <center> ZONA</center>
        </th>

        <th style='width: 20%; background-color: #637007; color: white; line-height: 100%'
        scope='col' align='center'>
            <center> TIPO DE USUARIO</center>
        </th>

        <th style='width: 20%; background-color: #637007; color: white; line-height: 100%'
        scope='col' align='center'>
            <center> EDITAR</center>
        </th>
        <th style='width: 20%; background-color: #637007; color: white; line-height: 100%'
        scope='col' align='center'>
            <center> BORRAR</center>
        </th>
    </thead>
`;

  if (respuesta.length < 1) {
    myTable += "<td scope='row'>" + "NO HAY USUARIOS" + "</td>";
    myTable += "</tr>";
  }
  else {
    // debugger
    for (i = 0; i < respuesta.length; i++) {

      myTable += "<td align='center'>" + respuesta[i].id + "</td>";
      myTable += "<td align='center'>" + respuesta[i].identification + "</td>";
      myTable += "<td align='center'>" + respuesta[i].name + "</td>";
      myTable += "<td align='center'>" + respuesta[i].address + "</td>";
      myTable += "<td align='center'>" + respuesta[i].cellPhone + "</td>";
      myTable += "<td align='center'>" + respuesta[i].email + "</td>";
      myTable += "<td align='center'>" + respuesta[i].zone + "</td>";
      myTable += "<td align='center'>" + respuesta[i].type + "</td>";

      sessionStorage.setItem('id', respuesta[i].id)
      sessionStorage.setItem('email', respuesta[i].email)


      myTable += "<td align='center'><button data-toggle='modal' data-target='#MymodalUpdate' class='btn btn-outline-success' onclick='consultarUser(" + respuesta[i].id + ",\"" + respuesta[i].email + "\")'> <img src='https://image.flaticon.com/icons/png/512/104/104668.png' width='50' height='30'>EDIT</button></td>";

      myTable += "<td align='center'><button  class='btn btn-outline-danger' onclick='deleteUser(" + respuesta[i].id + ",\"" + respuesta[i].email + "\")'> <img src='https://img.icons8.com/wired/64/000000/filled-trash.png' width='30' height='30'/>DELETE</button></td>";

      myTable += "</tr></tbody>";

      myTable += "</tr>";

    }
  }
  myTable += "</table>";
  $("#resultUsers").append(myTable);
}


async function autoInicioUsers() {
  const $welcome = document.querySelector("#welcome")
  $welcome.textContent = sessionStorage.getItem('nombre');

  try {
    const url = 'http://localhost:8080/api/user/all'
    // console.log(url)
    const response = await fetch(url);
    const responseJson = await response.json();
    pintarRespuesta(responseJson);

  } catch (error) {
    console.log("error:", error)
  }
}


async function consultarUser(id, email) {
  // sessionStorage.setItem('idUP', id);

  try {
    console.log("entro")

    // debugger
    const url = 'http://localhost:8080/api/user/' + id
    // console.log(url)
    const response = await fetch(url);
    const json = await response.json();

    $("#identificationUserU").val(json.identification)
    $("#nameUserU").val(json.name)
    $("#addressUserU").val(json.address)
    $("#cellphoneUserU").val(json.cellPhone)
    $("#emailUserU").val(json.email)
    $("#zoneUserU").val(json.zone)
    $("#typeUserU").val(json.type)
    $("#passwordUserU").val(json.password)


  } catch (error) {
    console.log("error:", error)
  }

}

async function createUser() {
  // debugger

  if (
    $("#identificationUser").val().length == 0 ||
    $("#nameUser").val().length == 0 ||
    $("#addressUser").val().length == 0 ||
    $("#cellphoneUser").val().length == 0 ||
    $("#emailUser").val().length == 0 ||
    $("#zoneUser").val().length == 0 ||
    $("#typeUser").val().length == 0 ||
    $("#passwordUser").val().length == 0
  ) {
    alert("TODOS LOS CAMPOS DEBEN ESTAR LLENOS")
  } 
  else if(!validateCreate()){
    alert("Revise los campos")
  }
  else {

    try {
      // debugger

      const urlUpdate = 'http://localhost:8080/api/user/new'

      const fetchOptions = {
        method: "POST",
        body: JSON.stringify({
          identification: $("#identificationUser").val(),
          name: $("#nameUser").val(),
          address: $("#addressUser").val(),
          cellPhone: $("#cellphoneUser").val(),
          email: $("#emailUser").val(),
          password: $("#passwordUser").val(),
          zone: $("#zoneUser").val(),
          type: $("#typeUser").val(),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const responseUpdate = await fetch(urlUpdate, fetchOptions);
      const responseConvertedUpdate = await responseUpdate.json();
      alert("Creado Satisfactoriamente");
      window.location.href = "/Users.html";

    } catch {
      window.location.reload()
      alert("No se guardó correctamente, intente de nuevo");
    }

  }
}

async function updateUser() {
  if (
    $("#identificationUserU").val().length == 0 ||
    $("#nameUserU").val().length == 0 ||
    $("#addressUserU").val().length == 0 ||
    $("#cellphoneUserU").val().length == 0 ||
    $("#emailUserU").val().length == 0 ||
    $("#zoneUserU").val().length == 0 ||
    $("#typeUserU").val().length == 0 ||
    $("#passwordUserU").val().length == 0
  ) {
    alert("TODOS LOS CAMPOS DEBEN ESTAR LLENOS")
  } else if(!validateUpdate()){
    alert("Revise los campos")
  }
  else {
    // debugger
    try {

// debugger
      const urlUpdate = 'http://localhost:8080/api/user/update'

      const fetchOptions = {
        method: "PUT",
        body: JSON.stringify({
          id:  sessionStorage.getItem('id'),
          identification: $("#identificationUserU").val(),
          name: $("#nameUserU").val(),
          address: $("#addressUserU").val(),
          cellPhone: $("#cellphoneUserU").val(),
          email: $("#emailUserU").val(),
          password: $("#passwordUserU").val(),
          zone: $("#zoneUserU").val(),
          type: $("#typeUserU").val()

        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const responseUpdate = await fetch(urlUpdate, fetchOptions);
      const responseConvertedUpdate = await responseUpdate.json();
      window.location.href = "/Users.html";

      alert("Actualización satisfactoria");

    } catch {
      window.location.reload()
      alert("No se actualizó correctamente, intente de nuevo");
    }

  }
}

async function deleteUser(id, email) {

  try {

    const urlUpdate = 'http://localhost:8080/api/user/' + id
    const fetchOptions = {
      method: "DELETE",
    };
    const responseUpdate = await fetch(urlUpdate, fetchOptions);
    const responseConvertedUpdate = await responseUpdate.json();
    window.location.href = "/Users.html";

  } catch {
    window.location.reload()
    alert("Borrado satisfactoriamente");
  }
}
