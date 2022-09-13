// const productos = [
//     { id: 1, nombre: "Placa de video", precio: 500000, imagen: '../img/placadevideo1.jpg', categoria: "placaVideo"},
//     { id: 2, nombre: "Procesador", precio: 30000, imagen: '../img/procesador1.jpeg', id2: 'btnComprar', categoria: "procesador"},
//     { id: 3, nombre: "Placa madre", precio: 25000, imagen: '../img/placa1.jpg', id2: 'btnComprar', categoria: "placaMadre"},
//     { id: 4, nombre: "Fuente de poder", precio: 20000, imagen: '../img/fuente1.jpg', id2: 'btnComprar', categoria: "fuente"},
//     { id: 5, nombre: "Memoria ram", precio: 5000, imagen: '../img/ram1.png', categoria: "memoriaRam"},
//     { id: 6, nombre: "Disco rigido", precio: 7000, imagen: '../img/discoRigido1.jpg', categoria: "discoRigido"},
//     { id: 7, nombre: "Disco solido", precio: 10000, imagen: '../img/discoSolido1.jpg', categoria: "discoSolido"},
//     { id: 8, nombre: "Cooler", precio: 3000, imagen: '../img/cooler1.png', categoria: "cooler"},
//     { id: 9, nombre: "Disco M2", precio: 10000, imagen: '../img/discom21.jpg', categoria: "discoM2"},
//     { id: 10, nombre: "Placa de video2", precio: 10000, imagen: '../img/placadevideo2.jpg', categoria: "placaVideo"},
//     { id: 11, nombre: "Placa de video3", precio: 10000, imagen: '../img/placadevideo3.jpg', categoria: "placaVideo"},
//     { id: 12, nombre: "Placa de video4", precio: 10000, imagen: '../img/placadevideo4.jpg', categoria: "placaVideo"},
//     { id: 13, nombre: "Placa de video5", precio: 10000, imagen: '../img/placadevideo5.jpeg', categoria: "placaVideo"},
//     { id: 14, nombre: "Placa de video6", precio: 10000, imagen: '../img/placadevideo6.jpg', categoria: "placaVideo"},
//     { id: 15, nombre: "Placa de video7", precio: 10000, imagen: '../img/placadevideo7.jpg', categoria: "placaVideo"},
//     { id: 16, nombre: "Procesador2", precio: 30000, imagen: '../img/procesador2.jpg', id2: 'btnComprar', categoria: "procesador"},
//     { id: 17, nombre: "Procesador3", precio: 30000, imagen: '../img/procesador3.webp', id2: 'btnComprar', categoria: "procesador"},
//     { id: 18, nombre: "Procesador4", precio: 30000, imagen: '../img/procesador4.jpg', id2: 'btnComprar', categoria: "procesador"},
//     { id: 19, nombre: "Procesador5", precio: 30000, imagen: '../img/procesador5.jpg', id2: 'btnComprar', categoria: "procesador"},
//     { id: 20, nombre: "Procesador6", precio: 30000, imagen: '../img/procesador6.png', id2: 'btnComprar', categoria: "procesador"},
//     { id: 21, nombre: "Procesador7", precio: 30000, imagen: '../img/procesador7.jpg', id2: 'btnComprar', categoria: "procesador"},
//     { id: 22, nombre: "Placa madre2", precio: 25000, imagen: '../img/placa2.jpg', id2: 'btnComprar', categoria: "placaMadre"},
//     { id: 23, nombre: "Placa madre3", precio: 25000, imagen: '../img/placa3.jpg', id2: 'btnComprar', categoria: "placaMadre"},
//     { id: 24, nombre: "Placa madre4", precio: 25000, imagen: '../img/placa4.jpg', id2: 'btnComprar', categoria: "placaMadre"},
//     { id: 25, nombre: "Placa madre5", precio: 25000, imagen: '../img/placa5.jpg', id2: 'btnComprar', categoria: "placaMadre"},
//     { id: 26, nombre: "Placa madre6", precio: 25000, imagen: '../img/placa6.png', id2: 'btnComprar', categoria: "placaMadre"},
//     { id: 27, nombre: "Placa madre7", precio: 25000, imagen: '../img/placa7.jpg', id2: 'btnComprar', categoria: "placaMadre"},
//     { id: 28, nombre: "Memoria ram2", precio: 5000, imagen: '../img/ram2.webp', categoria: "memoriaRam"},
//     { id: 29, nombre: "Memoria ram3", precio: 5000, imagen: '../img/ram3.jpg', categoria: "memoriaRam"},
//     { id: 30, nombre: "Memoria ram4", precio: 5000, imagen: '../img/ram4.webp', categoria: "memoriaRam"},
//     { id: 31, nombre: "Memoria ram5", precio: 5000, imagen: '../img/ram5.jpeg', categoria: "memoriaRam"},
//     { id: 32, nombre: "Memoria ram6", precio: 5000, imagen: '../img/ram6.jpg', categoria: "memoriaRam"},
//     { id: 33, nombre: "Fuente de poder2", precio: 20000, imagen: '../img/fuente2.jpg', id2: 'btnComprar', categoria: "fuente"},
//     { id: 34, nombre: "Fuente de poder3", precio: 20000, imagen: '../img/fuente3.jpg', id2: 'btnComprar', categoria: "fuente"},
//     { id: 35, nombre: "Fuente de poder4", precio: 20000, imagen: '../img/fuente4.jpg', id2: 'btnComprar', categoria: "fuente"},
//     { id: 36, nombre: "Fuente de poder5", precio: 20000, imagen: '../img/fuente5.png', id2: 'btnComprar', categoria: "fuente"},
//     { id: 37, nombre: "Fuente de poder6", precio: 20000, imagen: '../img/fuente6.jpg', id2: 'btnComprar', categoria: "fuente"},
//     { id: 38, nombre: "Fuente de poder7", precio: 20000, imagen: '../img/fuente7.jpg', id2: 'btnComprar', categoria: "fuente"},
//     { id: 39, nombre: "Disco rigido2", precio: 7000, imagen: '../img/discoRigido2.jpg', categoria: "discoRigido"},
//     { id: 40, nombre: "Disco rigido3", precio: 7000, imagen: '../img/discoRigido3.jpg', categoria: "discoRigido"},
//     { id: 41, nombre: "Disco rigido4", precio: 7000, imagen: '../img/discoRigido4.jpg', categoria: "discoRigido"},
//     { id: 42, nombre: "Disco rigido5", precio: 7000, imagen: '../img/discoRigido5.jpg', categoria: "discoRigido"},
//     { id: 43, nombre: "Disco solido2", precio: 10000, imagen: '../img/discoSolido2.jpg', categoria: "discoSolido"},
//     { id: 44, nombre: "Disco solido3", precio: 10000, imagen: '../img/discoSolido3.jpg', categoria: "discoSolido"},
//     { id: 45, nombre: "Disco solido4", precio: 10000, imagen: '../img/discoSolido4.jpeg', categoria: "discoSolido"},
//     { id: 46, nombre: "Disco solido5", precio: 10000, imagen: '../img/discoSolido5.jpg', categoria: "discoSolido"},
//     { id: 47, nombre: "Disco solido6", precio: 10000, imagen: '../img/discoSolido6.jpg', categoria: "discoSolido"},
//     { id: 48, nombre: "Disco solido7", precio: 10000, imagen: '../img/discoSolido7.jpg', categoria: "discoSolido"},
//     { id: 49, nombre: "Disco M22", precio: 10000, imagen: '../img/discom22.jpg', categoria: "discoM2"},
//     { id: 50, nombre: "Disco M23", precio: 10000, imagen: '../img/discom23.jpg', categoria: "discoM2"},
//     { id: 51, nombre: "Disco M24", precio: 10000, imagen: '../img/discom24.jpg', categoria: "discoM2"},
//     { id: 52, nombre: "Disco M25", precio: 10000, imagen: '../img/discom25.jpg', categoria: "discoM2"},
//     { id: 53, nombre: "Disco M26", precio: 10000, imagen: '../img/discom26.jpg', categoria: "discoM2"},
//     { id: 54, nombre: "Cooler2", precio: 3000, imagen: '../img/cooler2.jpg', categoria: "cooler"},
//     { id: 55, nombre: "Cooler3", precio: 3000, imagen: '../img/cooler3.jpg', categoria: "cooler"},
//     { id: 56, nombre: "Cooler4", precio: 3000, imagen: '../img/cooler4.jpg', categoria: "cooler"},
//     { id: 57, nombre: "Cooler5", precio: 3000, imagen: '../img/cooler5.jpg', categoria: "cooler"},
//     { id: 58, nombre: "Cooler6", precio: 3000, imagen: '../img/cooler6.jpg', categoria: "cooler"},
//   ];