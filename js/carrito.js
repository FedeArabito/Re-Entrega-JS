const carritoCantidad = document.getElementById("carrito-counter");



const pintarCarrito = ()=>{

  console.log(carrito.length);
  verCarritoContenedor.innerHTML="";
  verCarritoContenedor.style.display="flex";
    const verCarritoHeader = document.createElement("div");
    verCarritoHeader.className = "verCarritoHeader";
    verCarritoHeader.innerHTML = `
    <h4>Carrito</h4>
    <button class="btn-x">X</button>
    `;
    verCarritoContenedor.append(verCarritoHeader);
    const btnX=document.querySelector(".btn-x");
    btnX.addEventListener("click", ()=>{
      verCarritoContenedor.style.display="none";
    });

    carrito.forEach((producto) =>{
      const verCarritoCuerpo = document.createElement("div");
      verCarritoCuerpo.className = "verCarritoCuerpo";
      verCarritoCuerpo.innerHTML = `
      <img src="${producto.imagen}" />
      <h5>${producto.nombre}</h5>
      <p>${producto.precio*producto.cantidad}</p>
      <span class="restar">-</span>
      <p> Cantidad: ${producto.cantidad}</p>
      <span class="sumar">+</span>
      <span class="eliminar-btn">X</span>
      `;
      verCarritoContenedor.append(verCarritoCuerpo);

      let restar = verCarritoCuerpo.querySelector(".restar");
      restar.addEventListener("click",()=>{
        producto.cantidad !== 1 &&
        producto.cantidad--;
        guardarLocale();
        pintarCarrito();
        
      });

      let sumar = verCarritoCuerpo.querySelector(".sumar");
      sumar.addEventListener("click",()=>{
        producto.cantidad++;
        guardarLocale();
        pintarCarrito();
        
      });
      


      let eliminarProducto = verCarritoCuerpo.querySelector(".eliminar-btn");
      eliminarProducto.addEventListener("click", ()=>{
        eliminarCarrito(producto.id);
        guardarLocale();
        carritoCounter();
        
      });
    });

    const total = carrito.reduce((acc, producto) =>
      acc + producto.precio*producto.cantidad, 0);
    
    const verCarritoBottom = document.createElement("div");
    verCarritoBottom.className="verCarritoBottom"
    verCarritoBottom.innerHTML = `
    <h5>Total: ${total} $</h5>
    <span class="vaciar">Vaciar</span>
    <p class="buy-end">Comprar</p>
    `;
    verCarritoContenedor.append(verCarritoBottom);

    const vaciar = document.querySelector(".vaciar");
    vaciar.addEventListener("click", ()=>{
      verCarritoContenedor.innerHTML="";
      carrito = [];
      carritoCounter();
      guardarLocale();
      pintarCarrito();
      
      
    });

    const finalizarCompra = document.querySelector(".buy-end");
    finalizarCompra.addEventListener("click", ()=>{
      
      verCarritoContenedor.innerHTML="";
      
      if (carrito.length > 0) {
        Toastify({
          text: "Compra finalizada",
          className: "info",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          duration: 2000
        }).showToast();
        carrito = [];
        carritoCounter();
        guardarLocale();
      }else{
        Toastify({
          text: "Tu carrito esta vacio",
          className: "info",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          duration: 2000
        }).showToast();
        carritoCounter();
        guardarLocale();
        
      }
    
    });

   
    carritoCounter();

  }
  document.addEventListener("load", () => {
    carritoCounter();
  });

  verCarrito.addEventListener("click", (pintarCarrito));


  const eliminarCarrito = (id)=>{
    const productoId = carrito.find((el)=> el.id === id);
    
    carrito = carrito.filter((carritoId)=>{
      return carritoId !== productoId;
    });
    carritoCounter();
    guardarLocale();
    pintarCarrito();
  };


  const carritoCounter = ()=> {
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    carritoCantidad.innerHTML = JSON.parse(localStorage.getItem("carritoLength"));
  };
  carritoCounter();
  
  