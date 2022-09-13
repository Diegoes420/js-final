const contProdsComprar = document.getElementById('cont-prods-compra')
const btnCompra = document.getElementById('btn_compra_definitiva')
const cont_compra = document.getElementById('seccion_compra')
const cont_mensaje = document.getElementById('cont_mensaje')
const btnIrComprar = document.getElementById('btn_ir_comprar')


const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  num_tarjeta: /^\d{16}$/, // si o si 16 numeros
  cvc_tarjeta: /^\d{3}$/, // si o si 3 numeros
  hasta_tarjeta: /^\d{4}$/ // si o si 4 numeros
}

//comienzan siendo falsas, más adelante se comprobará su valor
const validaciones = {
  nombre: nombre = false,
  correo: correo = false,
  telefono: telefono = false,
  numTarjeta: numTarjeta = false,
  nomTarjeta: nomTarjeta = false,
  cvcTarjeta: cvcTarjeta = false,
  hastaTarjeta: hastaTarjeta = false,
}

const formularioCompra = document.getElementById("formulario_compra");
const inputsss = document.querySelectorAll('#formulario_compra input')
let errorCompra = document.getElementById("error_compra");

//función que me permite testear si cumple con las normas de mis expresiones regulares
const validarInput = (e) => {
  switch (e.target.name) {
    case "nombre":
      if (expresiones.nombre.test(e.target.value)) {
        validaciones.nombre = true;
        errorCompra.className = 'text-bg-danger rounded-1 d-none'
      } else {
        errorCompra.className = 'text-bg-danger rounded-1 d-block'
      }
      break;
    case "correo":
      if (expresiones.correo.test(e.target.value)) {
        validaciones.correo = true
        errorCompra.className = 'text-bg-danger rounded-1 d-none'
      } else {
        errorCompra.className = 'text-bg-danger rounded-1 d-block'
      }
      break;
    case "telefono":
      if (expresiones.telefono.test(e.target.value)) {
        validaciones.telefono = true
        errorCompra.className = 'text-bg-danger rounded-1 d-none'
      } else {
        errorCompra.className = 'text-bg-danger rounded-1 d-block'
      }
      break;
    case "num_tarjeta":
      if (expresiones.num_tarjeta.test(e.target.value)) {
        validaciones.numTarjeta = true
        errorCompra.className = 'text-bg-danger rounded-1 d-none'
      } else {
        errorCompra.className = 'text-bg-danger rounded-1 d-block'
      }
      break;
    case "nom_tarjeta":
      if (expresiones.nombre.test(e.target.value)) {
        validaciones.nomTarjeta = true
        errorCompra.className = 'text-bg-danger rounded-1 d-none'
      } else {
        errorCompra.className = 'text-bg-danger rounded-1 d-block'
      }
      break;
    case "cvc_tarjeta":
      if (expresiones.cvc_tarjeta.test(e.target.value)) {
        validaciones.cvcTarjeta = true
        errorCompra.className = 'text-bg-danger rounded-1 d-none'
      } else {
        errorCompra.className = 'text-bg-danger rounded-1 d-block'
      }
      break;
    case "hasta_tarjeta":
      if (expresiones.hasta_tarjeta.test(e.target.value)) {
        validaciones.hastaTarjeta = true
        errorCompra.className = 'text-bg-danger rounded-1 d-none'
      } else {
        errorCompra.className = 'text-bg-danger rounded-1 d-block'
      }
      break;
  }
}

//para cada input le voy a agregar eventos y la funcion para validarlos
inputsss.forEach((inputs) => {
  inputs.addEventListener('keyup', validarInput)
  inputs.addEventListener('blur', validarInput)
})

//cuando el documento este cargado, renderizo los procutos que tenga en el carrito
document.addEventListener("DOMContentLoaded", () => {
  carrito.forEach((producto) => {

    contProdsComprar.innerHTML += `
      <div class="producto_finalizarCompra">
        <img src="${producto.imagen}" alt="">
        <p>${producto.nombre}</p>
        <p>$${producto.precio}</p>
      </div>
      <hr>
    `;
    const precioTOTAL = document.getElementById("precioTotalCompra");
    precioTOTAL.innerText =
      "$" + carrito.reduce((acc, prod) => acc + prod.precio, 0);
    btnCompra.onclick = (e) => {

      if ((validaciones.nombre && validaciones.correo && validaciones.telefono && validaciones.numTarjeta && validaciones.nomTarjeta && validaciones.cvcTarjeta && validaciones.hastaTarjeta)) {
        window.scrollTo(0, 0)
        carrito.length = 0;
        actualizarStorage();
        cont_compra.innerHTML = "";
        cont_mensaje.className = "cont_mensaje d-flex";
        cont_mensaje.innerHTML = `
          <div id="parte_compra_finalizada" class="compraFinalizada col-md-12">
            <h3>¡Gracias <span class="text-danger">${inputsss[0].value}</span> por elegirnos!</h3>
            <p>¡El pago fue realizado con éxito!</p>
            <p>Corroborá las instrucciones de retiro en tu correo: <span class="text-danger"> ${inputsss[1].value}</span></p>
            <p>Mandamos un codigo de seguimiendo al numero: <span class="text-danger"> ${inputsss[2].value}</span></p>
            <p>Pagaste $ ${precioTotal.textContent}</p>
            <p>Con la tarjeta número: **** - **** - **** - ${inputsss[3].value.slice(12, 16)}</p>
          </div>
        `;
      } else {
        errorCompra.className = 'text-bg-danger rounded-1 d-block'
        e.preventDefault()
      }
    };
  });
});




