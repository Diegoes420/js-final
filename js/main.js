// declaro variables

let carrito = [];
let productos = [];
const tbody = document.body;
const botonVaciar = document.getElementById("vaciar-carrito");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const padreProductos = document.getElementById("contenedorProductos");
const contenedorFiltrado = document.getElementById("contenedorFiltrado");
const btn_Comprar = document.getElementById('btn_ir_comprar')
const mensajeAgrega = document.getElementById('mensaje_agrega')

// cuando el documento este cargado, utilizo local storage
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});


//evento que me permite poner la longitud del carrito en 0
botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarStorage();
  actualizarCarrito();
});



let contenedorProductos = document.querySelector(".contenedorProductos");

// función para renderizar las cards en el DOM
const renderizarProductos = () => {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card card-edit";
    card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
            <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$ ${producto.precio2}</p>
            <button id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
            </div>
            `;
    contenedorProductos.appendChild(card);

    const boton = document.getElementById(`agregar${producto.id}`);

    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });

};

// función para agregar al carrito los productos que esten filtrados
const agregarAlCarritoProdsFiltrados = (prodID) => {
  const item = productosFiltrados[0].find((prod) => prod.id === prodID);
  carrito.push(item);
  Toastify({
    text: "Producto: " + item.nombre + " agregado al carrito!",

    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    style: {
      width: "300px",
      background: "#202020",
    },
  }).showToast();
  actualizarCarrito();
};

// funcion para pushear el producto al array carrito
const agregarAlCarrito = (prodId) => {
  const item = productos.find((producto) => producto.id === prodId);
  carrito.push(item);
  Toastify({
    text: "Producto: " + item.nombre + " agregado al carrito!",

    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    style: {
      width: "300px",
      background: "#202020",
    },
  }).showToast();
  actualizarCarrito();
};

// funcion para eliminar el producto al array carrito
const eliminarDelCarrito = (prodID) => {
  const item = carrito.find((producto) => producto.id === prodID);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarStorage();
  actualizarCarrito();
};

// esta funcion me permite controlar la longitud del carrito, y ademas rendirizar lo que tenga en el
const actualizarCarrito = () => {
  if (carrito.length != 0) {
    botonVaciar.className = 'btn btn-danger m-4 d-inline'
    btn_Comprar.className = 'btn btn-success m-4 d-inline border-0'
    mensajeAgrega.className = 'd-none'
  } else {
    mensajeAgrega.className = 'd-inline'
    botonVaciar.className = 'btn btn-danger m-4 d-none'
    btn_Comprar.className = 'btn btn-success m-4 d-none'
  }
  contenedorCarrito.innerHTML = "";
  carrito.forEach((producto) => {
    const cardCarrito = document.createElement("div");
    cardCarrito.className = "card-carrito col-md-3";
    cardCarrito.innerHTML = `
        <div class="d-flex flex-row carrito-item justify-content-between">
            <img class="img-prod-carrito" src="${producto.imagen}" >
            <div class="cont_nomprecio">
                <p class="carritoNombre">${producto.nombre}</p>
                <p class="carritoPrecio">$ ${producto.precio2}</p>
            </div>
            <button onclick ="eliminarDelCarrito(${producto.id})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <hr>
        `;
    contenedorCarrito.appendChild(cardCarrito);
    actualizarStorage();
  });
  contadorCarrito.innerText = carrito.length;
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);
};

const actualizarStorage = () =>
  localStorage.setItem("carrito", JSON.stringify(carrito));


// ------  INTENTO DE FILTRO ;)  ------ //  <- esto lo llamé así cuando lo hice porque me parecia que la forma que tuve de escribir el codigo era poco ortodoxa jajaaj :)

const productosFiltrados = [];

// función que me permite comprobar y filtrar el producto que seleccionemos y guardarlo en mi array de productosFiltrados
const filtrarProducto = (categoriaProd) => {
  renderizarProductos()
  const categoria = productos.filter(
    (producto) => producto.categoria === categoriaProd
  );
  productosFiltrados.push(categoria);
};

let inputs = document.querySelectorAll("#padreInputs input");


// A continuación, son eventos que me si presiono x input me va a mostrar la categoria x que elija, esto fue lo que más le di vueltas a hacer, intenté hacer algo más escalable pero no se me ocurrió, seguro con react con el uso de componentes puedo hacer algo mucho mejor

//TODO
inputs[0].onclick = () => {
  productosFiltrados.length = 0;
  padreProductos.style.display = "flex";
  contenedorFiltrado.style.display = "none";
  padreProductos.innerHTML = ''
  renderizarProductos()
};

//PLACAS
inputs[1].onclick = () => {
  contenedorFiltrado.innerHTML = "";
  productosFiltrados.length = 0;
  filtrarProducto(productos[2].categoria);
  padreProductos.style.display = "none";
  contenedorFiltrado.style.display = "flex";
  contenedorFiltrado.className =
    "contenedorFiltrado w-75 flex-wrap justify-content-center";

  productosFiltrados[0].forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card card-edit col-md-3";
    card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$ ${producto.precio2}</p>
                <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
            </div>
            `;
    contenedorFiltrado.append(card);
  });
};

//PROCESADORES
inputs[2].onclick = () => {
  contenedorFiltrado.innerHTML = "";
  productosFiltrados.length = 0;

  filtrarProducto(productos[1].categoria);

  padreProductos.style.display = "none";
  contenedorFiltrado.style.display = "flex";
  contenedorFiltrado.className =
    "contenedorFiltrado w-75 flex-wrap justify-content-center";

  productosFiltrados[0].forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card card-edit col-md-3";
    card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$ ${producto.precio2}</p>
                <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
            </div>
            `;
    contenedorFiltrado.append(card);
  });
};

//PLACAS DE VIDEO
inputs[3].onclick = () => {
  contenedorFiltrado.innerHTML = "";
  productosFiltrados.length = 0;

  filtrarProducto(productos[0].categoria);

  padreProductos.style.display = "none";
  contenedorFiltrado.style.display = "flex";
  contenedorFiltrado.className =
    "contenedorFiltrado w-75 flex-wrap justify-content-center";

  productosFiltrados[0].forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card card-edit col-md-3";
    card.innerHTML = `
              <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">$ ${producto.precio2}</p>
                  <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
              </div>
              `;
    contenedorFiltrado.append(card);
  });
};

//MEMORIAS RAM
inputs[4].onclick = () => {
  contenedorFiltrado.innerHTML = "";
  productosFiltrados.length = 0;

  filtrarProducto(productos[4].categoria);

  padreProductos.style.display = "none";
  contenedorFiltrado.style.display = "flex";
  contenedorFiltrado.className =
    "contenedorFiltrado w-75 flex-wrap justify-content-center";

  productosFiltrados[0].forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card card-edit col-md-3";
    card.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$ ${producto.precio2}</p>
                    <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
                </div>
                `;
    contenedorFiltrado.append(card);
  });
};

//FUENTES DE PODER
inputs[5].onclick = () => {
  contenedorFiltrado.innerHTML = "";
  productosFiltrados.length = 0;

  filtrarProducto(productos[3].categoria);

  padreProductos.style.display = "none";
  contenedorFiltrado.style.display = "flex";
  contenedorFiltrado.className =
    "contenedorFiltrado w-75 flex-wrap justify-content-center";

  productosFiltrados[0].forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card card-edit col-md-3";
    card.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$ ${producto.precio2}</p>
                    <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
                </div>
                `;
    contenedorFiltrado.append(card);
  });
};

//DISCOS RIGIDOS
inputs[6].onclick = () => {
  contenedorFiltrado.innerHTML = "";
  productosFiltrados.length = 0;

  filtrarProducto(productos[5].categoria);

  padreProductos.style.display = "none";
  contenedorFiltrado.style.display = "flex";
  contenedorFiltrado.className =
    "contenedorFiltrado w-75 flex-wrap justify-content-center";

  productosFiltrados[0].forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card card-edit col-md-3";
    card.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$ ${producto.precio2}</p>
                    <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
                </div>
                `;
    contenedorFiltrado.append(card);
  });
};

//DISCOS SOLIDOS
inputs[7].onclick = () => {
  contenedorFiltrado.innerHTML = "";
  productosFiltrados.length = 0;

  filtrarProducto(productos[6].categoria);

  padreProductos.style.display = "none";
  contenedorFiltrado.style.display = "flex";
  contenedorFiltrado.className =
    "contenedorFiltrado w-75 flex-wrap justify-content-center";

  productosFiltrados[0].forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card card-edit col-md-3";
    card.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$ ${producto.precio2}</p>
                    <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
                </div>
                `;
    contenedorFiltrado.append(card);
  });
};

//DISCOS M2
inputs[8].onclick = () => {
  contenedorFiltrado.innerHTML = "";
  productosFiltrados.length = 0;

  filtrarProducto(productos[8].categoria);

  padreProductos.style.display = "none";
  contenedorFiltrado.style.display = "flex";
  contenedorFiltrado.className =
    "contenedorFiltrado w-75 flex-wrap justify-content-center";

  productosFiltrados[0].forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card card-edit col-md-3";
    card.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$ ${producto.precio2}</p>
                    <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
                </div>
                `;
    contenedorFiltrado.append(card);
  });
};

//COOLERS
inputs[9].onclick = () => {
  contenedorFiltrado.innerHTML = "";
  productosFiltrados.length = 0;

  filtrarProducto(productos[7].categoria);

  padreProductos.style.display = "none";
  contenedorFiltrado.style.display = "flex";
  contenedorFiltrado.className =
    "contenedorFiltrado w-75 flex-wrap justify-content-center";

  productosFiltrados[0].forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card card-edit col-md-3";
    card.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$ ${producto.precio2}</p>
                    <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
                </div>
                `;
    contenedorFiltrado.append(card);
  });
};

// renderizo
renderizarProductos();

//funcion asincrona para obtener datos del JSON ( gracias profe por la idea, :) ©Lau )
async function obtenerJSON() {
  const res = await fetch('../stock.json')
  const data = await res.json()
  productos = data
  renderizarProductos()
}
obtenerJSON()

