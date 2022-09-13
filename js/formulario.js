const formulario = document.getElementById('form-box')
const inputss = document.querySelectorAll('#formulario, input')
const mensajesError = document.getElementsByClassName('mensaje_error')

//expresiones regulares
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const validaciones = {
    nombre: nombre = false,
    correo: correo = false,
    telefono: telefono = false,
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            if (expresiones.nombre.test(e.target.value)) {
                inputss[0].className = 'form-control mb-3 border border-success'
                mensajesError[0].className = 'mensaje_error d-none'
                validaciones.nombre = true;
            } else {
                inputss[0].className = 'form-control mb-3 border border-danger'
                mensajesError[0].className = 'mensaje_error d-block'
            }
            break;
        case "email":
            if (expresiones.correo.test(e.target.value)) {
                inputss[1].className = 'form-control mb-3 border border-success'
                validaciones.correo = true;
                mensajesError[1].className = 'mensaje_error d-none'
            } else {
                inputss[1].className = 'form-control mb-3 border border-danger'
                mensajesError[1].className = 'mensaje_error d-block'
            }
            break;
        case "telefono":
            if (expresiones.telefono.test(e.target.value)) {
                inputss[2].className = 'form-control mb-3 border border-success'
                mensajesError[2].className = 'mensaje_error d-none'
                validaciones.telefono = true;
            } else {
                inputss[2].className = 'form-control mb-3 border border-danger'
                mensajesError[2].className = 'mensaje_error d-block'
            }
            break;
    }
};

inputss.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

// si los campos estan en true, se manda la informacion, si no previene el comportamiento.
formulario.addEventListener('submit', (e) => {
    // operador ternario ;) (no podia poner nada arriba, eran muchas ejecuciónes)
    validaciones.nombre && validaciones.correo && validaciones.telefono ? formulario.reset() : e.preventDefault();
});
