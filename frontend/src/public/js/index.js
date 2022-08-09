function saveData(){
    let dataName = document.getElementById('dataName').value

    if(dataName == "" || dataName == 0){
        Swal.fire(
            '¡Atención!',
            'El campo no puede estar vacío',
            'warning'
        )
        return false
    }
    var objData = {
        "name": dataName.trim()
    }
    $.ajax({
        type:'POST',
        dataType: 'json',
        data: objData,
        url: '/upload',
        success: function(json) {
            console.log("okey", json);
        },
        error: function (error) {
            if(error.responseText == "Ya existe pila con ese nombre"){
                Swal.fire(
                    'Error',
                    'Ya existe dato con ese nombre',
                    'error'
                )
            }else{
                if(error.responseText == "Pila creada correctamente"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Dato creado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() =>{
                        window.location.href = '/'
                    })
                }
            }
        },
    })
}
const uploadFile = async (id, url) =>{
    var formData = new FormData()
    const { value: file } = await Swal.fire({
        title: 'Selecciona una imagen',
        input: 'file',
        inputAttributes: {
          'accept': 'image/*',
          'aria-label': 'Subir imagen'
        }
    })
    if(!file){
        Swal.fire(
            '¡Atención!',
            'El campo no puede estar vacío',
            'warning'
        )
        return false
    }
    formData.append('file', file)
    const response = await fetch(url+"/api/file/"+id, {
        method: 'POST',
        body: formData,
    })
    if(response.status == 201){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Archivo añadido correctamente',
            showConfirmButton: false,
            timer: 1500
        }).then(() =>{
            window.location.reload()
        })
    }else{
        Swal.fire(
            'Error',
            'Ocurrió un error',
            'error'
        )
        console.log(response);
    }
}

function editData(id){
    const dataName = document.getElementById('dataName').value

    if(dataName == "" || dataName == 0){
        Swal.fire(
            '¡Atención!',
            'El campo no puede estar vacío',
            'warning'
        )
        return false
    }
    var objData = {
        "name": dataName.trim()
    }
    $.ajax({
        type:'POST',
        dataType: 'json',
        data: objData,
        url: '/edit/'+id,
        success: function(json) {
            console.log("okey", json);
        },
        error: function (error) {
            if(error.responseText == "Ya existe pila con ese nombre"){
                Swal.fire(
                    'Error',
                    'Ya existe dato con ese nombre',
                    'error'
                )
            }else{
                if(error.responseText == "Nombre de pila actualizado correctamente"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Nombre actualizado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() =>{
                        window.location.href = '/'
                    })
                }else{
                    Swal.fire(
                        'Error',
                        error.responseText,
                        'error'
                    )
                }
            }
        },
    })
}

function deletePila(id){
    const url = '/pila/'+ id + '/delete'
    Swal.fire({
        title: '¿Eliminar?',
        text: "Se eliminará con todos sus datos relacionados",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'POST',
                accepts: "application/json",
                success: function (json) {
                    if(json == "No se encontró la pila"){
                        Swal.fire(
                            'Error',
                            json,
                            'error'
                        ).then((result) =>{
                            if(result.isConfirmed){
                                window.location.href = '/';
                            }
                        })
                    }else{
                        if(json == "Pila eliminada correctamente con sus respectivas relaciones"){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Dato eliminado correctamente con sus respectivas relaciones',
                                showConfirmButton: false,
                                timer: 2000
                            }).then(() =>{
                                window.location.href = '/'
                            })
                        }else{
                            Swal.fire(
                                'Error',
                                json,
                                'error'
                            )
                        }
                    }
                },
                error: function (error) {
                    Swal.fire(
                        'Error',
                        error,
                        'error'
                    )
                }
            });
        }
      })

}

function deleteFile(id){
    Swal.fire({
        title: '¿Eliminar?',
        text: "¿Desea eliminar el archivo?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/file/'+id+"/delete",
                type: 'POST',
                accepts: "application/json",
                success: function (json) {
                    console.log(json);
                    if(json == "Archivo eliminado correctamente"){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Archivo eliminado correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() =>{
                            window.location.reload()
                        })
                        
                    }else{
                        if(json == "No se encontró el archivo"){
                            Swal.fire(
                                'Error',
                                'No se encontró el archivo',
                                'error'
                            ).then((result) =>{
                                if(result.isConfirmed){
                                    window.location.reload()
                                }
                            })
                            
                        }else{
                            Swal.fire(
                                'Error',
                                'Ocurrió un error',
                                'error'
                            )
                        }
                    }
                    
                },
                error: function (error) {
                    console.log(error);
                    Swal.fire(
                        'Error',
                        error,
                        'error'
                    )
                }
            })
            
        }
    })
}
