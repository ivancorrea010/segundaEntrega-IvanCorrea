let precioMasaTradicional = 250;
let precioMasaZanahoria = 300;
let precioMasaCalabaza = 350;
let precioMasaPapa = 325;
let precioPuntadeAgua = 400;
let precioBarraza = 375;

class Productos {
  constructor(nombre, precio, img, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.precioIva;
    this.id = id;
  }

  getIva() {
    return (this.precioIva = this.precio * 1.21);
  }
}

const users = ["JUAN", "IVAN"];

const masaTradicional = new Productos(
  '"Masa tradicional"',
  precioMasaTradicional,
  "img/MasaNormal.jpg",
  1
);
const masaZanahoria = new Productos(
  '"Masa de zanahoria"',
  precioMasaZanahoria,
  "img/masaZanahoria.jpg",
  2
);
const masaCalabaza = new Productos(
  '"Masa de calabaza"',
  precioMasaCalabaza,
  "img/MasaCalabaza.jpg",
  3
);
const masaPapa = new Productos(
  '"Masa de papa"',
  precioMasaPapa,
  "img/MasaPapa.png",
  4
);
const quesoPuntaDeAgua = new Productos(
  '"Queso Punta de agua"',
  precioPuntadeAgua,
  "img/QuesoCremoso.jpg",
  5
);
const quesoBarraza = new Productos(
  '"Muzzarella Barraza"',
  precioBarraza,
  "img/QuesoMuzzarella.jpg",
  6
);

const arrayProductos = [
  masaTradicional,
  masaZanahoria,
  masaCalabaza,
  masaPapa,
  quesoPuntaDeAgua,
  quesoBarraza,
];
let arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];


const contenedor = document.querySelector("#etiquetaContenedor");
const contador = document.querySelector(".contador");
/* abrir y cerrar modal */
const abrirCarrito = document.getElementById("open");
const modal = document.querySelector(".myModal");
const precioTotal = document.querySelector("#precio");

abrirCarrito.addEventListener("click", () => {
  modal.classList.toggle("vis");
});

function crearCards() {
  arrayProductos.forEach((producto) => {
    console.log(producto.id);
    const { img, nombre, precio, id } = producto;
    contenedor.innerHTML += `
        <div class="div-card">
            <img class="img-producto" src=${img}>
            <div class="div-titulo-producto">
                <h2>${nombre}</h2>
                <p>$${precio}</p>
                <button id="prod-${id}" data-id="${id}" class="btn-agregar">Agregar</button>
            </div>
        </div>
    `;
  });

  darFuncionalidadBtn();
}

function darFuncionalidadBtn() {
  arrayProductos.forEach((producto) => {
    document
      .querySelector(`#prod-${producto.id}`)
      .addEventListener("click", () => {
        agregarProdAlCarrito(producto);
      });
  });
}

function agregarProdAlCarrito(prod) {
  let existe = arrayCarrito.some((producto) => producto.id == prod.id);

  if (existe === false) {
    prod.cantidad = 1;
    arrayCarrito.push(prod);
  } else {
    let producto = arrayProductos.find((element) => element.id == prod.id);
    producto.cantidad++;
  }
  renderizarProds();
}

function renderizarProds() {
  modal.innerHTML = "";
  let divTotal = document.createElement("div");
  arrayCarrito.forEach((producto) => {
    const { nombre, precio, cantidad, id } = producto;
    modal.innerHTML += `
        <div class="div-card">
            
            <div class="div-titulo-producto">
                <h2>${nombre}</h2>
                <p>$${precio}</p>
                <p>CANTIDAD: ${cantidad}</p>
                <button id="prod-eliminar-${id}" data-id="${id}" class="btn-agregar">Eliminar</button>
                <button id="prod-menos-${id}" class="btn-agregar">-</button>
            </div>
            
        </div>
    `;
  });

  contador.innerText = arrayCarrito.length;
  let totalReduce = arrayCarrito.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );
  divTotal.innerHTML = `Total:$${totalReduce}`;
  modal.appendChild(divTotal);

  eliminarProd();
  restarProd();
  localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
}

function eliminarProd() {
  arrayCarrito.forEach((producto) => {
    document
      .querySelector(`#prod-eliminar-${producto.id}`)
      .addEventListener("click", () => {
        arrayCarrito = arrayCarrito.filter((prod) => prod.id != producto.id);

        renderizarProds();
      });
  });
}

function restarProd() {
  arrayCarrito.forEach((producto) => {
    document
      .querySelector(`#prod-menos-${producto.id}`)
      .addEventListener("click", () => {
        producto.cantidad--;
        producto.cantidad === 0 && (producto.cantidad = 1);
        renderizarProds();
      });
  });
}

renderizarProds();
crearCards();
