const shopContenido = document.getElementById("shopContenido");
const verCarrito = document.getElementById("carrito");
const verCarritoContenedor = document.getElementById("carrito-contenedor");




let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log(carrito.length);




const getData = async () => {
  const response = await fetch("data.json");
  const data = await response.json();


    data.forEach(({ imagen, nombre, precio, id, cantidad, marca }) => {
      let contenido = document.createElement("div");
      contenido.className = "card";
      contenido.innerHTML = `
  <img src="${imagen}"/>
  <h3 class="card-name">${nombre}</h3>
  <p>${precio} $</p>
  `;

      shopContenido.append(contenido)

      let btnComprar = document.createElement("a");
      btnComprar.className = "card-btn";
      btnComprar.innerHTML = `
  <img src="../img/cart.svg"/>
  `
      contenido.append(btnComprar);

      btnComprar.addEventListener("click", () => {

        const productoRepetido = carrito.some((repetido) => repetido.id === id);
        productoRepetido === true
          ?
          carrito.map((prod) => {
            prod.id === id && prod.cantidad++;
          })
          : carrito.push({
            id,
            nombre,
            imagen,
            precio,
            cantidad,
            marca,
          })
        console.log(carrito);
        console.log(carrito.length);
        Toastify({
          text: `${nombre} ha sido agregado al carrito`,
          className: "info",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          duration: 1500
        }).showToast();
        carritoCounter();
        guardarLocale();
      });

    });
  }

  const guardarLocale = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };


  getData();
  






