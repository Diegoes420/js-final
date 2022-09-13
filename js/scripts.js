const tbody = document.body;
let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

localStorage.getItem("carrito") && console.log(carrito);

// declaro variables
const botonVaciar = document.getElementById("vaciar-carrito");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const padreProductos = document.getElementById("contenedorProductos");
const contenedorFiltrado = document.getElementById("contenedorFiltrado");

botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarStorage();
  actualizarCarrito();
});

function archivos(){
  fetch("../stock.json")
      .then((res) => res.json())
      .then((prods) => {
        productos = prods
      });
}

let contenedorProductos = document.querySelector(".contenedorProductos");

// renderizo las cards en el DOM
const renderizarProductos = () => {
  fetch("../stock.json")
    .then((res) => res.json())
    .then((prods) => {
      let productos = prods;
      productos.forEach((producto) => {
        const card = document.createElement("div");
        card.className = "card card-edit";
        card.innerHTML = `
        <img src="${producto.imagen}" class="card-img-top img-producto" alt="...">
        <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.precio}</p>
        <button id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
        </div>
        `;
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`agregar${producto.id}`);

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto.id);
        });
      });
    });
};

//
const agregarAlCarritoProdsFiltrados = (prodID) => {
  const item = productosFiltrados[0].find((prod) => prod.id === prodID);
  carrito.push(item);
  console.log(item);
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
  fetch("../stock.json")
    .then((res) => res.json())
    .then((prods) => {
      let productos = prods;

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
      // Swal.fire({
      //   position: 'bottom-end',
      //   icon: 'success',
      //   text: 'Producto: '+ item.nombre + ' agregado al carrito!',
      //   showConfirmButton: false,
      //   timer: 1500,
      //   width: '200',
      //   height: '100',
      //   fontSize: '10'
      // })
      actualizarCarrito();
    });
};

// funcion para eliminar el producto al array carrito
const eliminarDelCarrito = (prodID) => {
  const item = carrito.find((producto) => producto.id === prodID);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarStorage();
  actualizarCarrito();
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  carrito.forEach((producto) => {
    const cardCarrito = document.createElement("div");
    cardCarrito.className = "card-carrito col-md-3";
    cardCarrito.innerHTML = `
        <div class="d-flex flex-row carrito-item justify-content-between">
            <img class="img-prod-carrito" src="${producto.imagen}" >
            <div>
                <p class="carritoNombre">${producto.nombre}</p>
                <p class="carritoPrecio">$ ${producto.precio}</p>
            </div>
            <button onclick ="eliminarDelCarrito(${producto.id})" class="btn btn-danger">-</button>
        </div>
        `;
    contenedorCarrito.appendChild(cardCarrito);
    actualizarStorage();
  });
  contadorCarrito.innerText = carrito.length;
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);
};

const actualizarStorage = () =>
  localStorage.setItem("carrito", JSON.stringify(carrito));

  
  // ------  INTENTO DE FILTRO ;)  ------ //

  const productosFiltrados = [];
  
  const filtrarProducto = (categoriaProd) => {
    fetch("../stock.json")
      .then((res) => res.json())
      .then((prods) => {
        let productos = prods;

        const categoria = productos.filter(
          (producto) => producto.categoria === categoriaProd
        );
        productosFiltrados.push(categoria);
      });
  };
  
  let inputs = document.querySelectorAll("#padreInputs input");

//TODO
inputs[0].onclick = () => {
  productosFiltrados.length = 0;
  padreProductos.style.display = "flex";
  contenedorFiltrado.style.display = "none";
};

//PLACAS
inputs[1].onclick = () => {
  //operador ternario
  inputs[1].checked ? console.log(inputs[1]) : console.log("error");
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
                <p class="card-text">${producto.precio}</p>
                <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
            </div>
            `;
    contenedorFiltrado.append(card);
  });
};

//PROCESADORES
inputs[2].onclick = () => {
  //con operador logico and
  inputs[2].checked && console.log(inputs[2])
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
                <p class="card-text">${producto.precio}</p>
                <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
            </div>
            `;
    contenedorFiltrado.append(card);
  });
  actualizarCarrito();
};

//PLACAS DE VIDEO
inputs[3].onclick = () => {
  //operador logico or
  !inputs[3].checked || console.log(inputs[3]);
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
                  <p class="card-text">${producto.precio}</p>
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
                    <p class="card-text">${producto.precio}</p>
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
                    <p class="card-text">${producto.precio}</p>
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
                    <p class="card-text">${producto.precio}</p>
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
                    <p class="card-text">${producto.precio}</p>
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
                    <p class="card-text">${producto.precio}</p>
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
                    <p class="card-text">${producto.precio}</p>
                    <button onclick="agregarAlCarritoProdsFiltrados(${producto.id})" id="agregar${producto.id}" class="btn btn-dark">Agregar <i class="fas-fa-shopping-cart"</i></button>
                </div>
                `;
    contenedorFiltrado.append(card);
  });
};

// renderizo
renderizarProductos();

