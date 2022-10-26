function setcarritoVacio(){
    cartRows.innerHTML = `
            div class="alert alert-warning my-2 text-center">No tienes productos en el carrito</div>        
    `;
}

function vaciarCarrito(){
    localStorage.removeItem("carrito");
}

function calcularTotal(products){
    return products.reduce(
        (acum,products) => (acum += products.precio + products.cantidad -1),
        0
    );
}

let cartRows = document.querySelector(".cart");

let productos = [];

if(localStorage.carrito){
    let carrito = JSON.parse(localStorage.carrito)
    
    carrito.forEach((item,index)=> {
        fetch(`/product/${item.id}`)
            .then((res) => res.json())
            .then((product)=>{
                if(product){
                    cartRows.innerHTML += `        
                    <div class="d-block d-md-flex mt-5">
                    ${index + 1}
                      <img
                        class="imagen-carrito m-2"
                        src="${product.imagen}"
                        alt=""
                      />
                      <div class="row">
                        <div
                          class="descripcion col-lg-5 col-md-9 col-9 order-lg-1 order-1 mt-2 mx-3"
                        >
                          <h4 class="fs-md-3 fs-5 mb-3">Nombre</h4>
                          <p class="fs-6">
                            ${product.nombre}
                          </p>
                        </div>
                        <div
                          class="cantidad col-lg-1 col-md-4 col-3 order-lg-2 order-3 mx-5"
                        >
                          <p>cantidad</p>
                          <div class="aumentar">
                            <button
                              type="button"
                              class="btn btn-danger btn-number d-inline"
                            >
                              -
                            </button>
                            <input type="text" class="d-inline" value="${item.cantidad}" />
                            <button type="button" class="btn btn-success d-inline">
                              +
                            </button>
                          </div>
                        </div>
                        <div
                          class="precio col-lg-1 col-md-4 col-3 order-lg-3 order-4 mt-5 mx-4 fs-md-2 fs-4"
                        >
                        
                          $${parseFloat(
                            product.precio * item.cantidad,
                            2
                          ).toFixed(2)}
                        </div>
                        <div class="col-1 order-lg-4 order-2 mt-5 mx-3">
                          <a href="#">
                            <iconify-icon
                              icon="bi:x"
                              style="color: #de9898"
                              width="40"
                            ></iconify-icon>
                          </a>
                        </div>
                      </div>
                    </div>`;
                productos.push({
                    productId: product.id,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: item.cantidad
                })
                } else {
                    //si no esta el producto lo borra del local storage
                    carrito.splice(index,1);
                    localStorage.setItem('carrito')
                }
            })
            .then(() => {
                document.querySelector(".total").innerText = `$ ${calcularTotal(productos)}`;
            });
    });
} else {
  // setcarritoVacio()
}

//compra 

let checkoutCart = document.querySelector('#cheackoutCart')

checkoutCart.onsubmit = (e) => {
  e.preventDefault();
  const formData = {
    ordenItems: productos,
    metodoDePago: cheackoutCart.paymentMethod.value,
    puntoDeEncuentro: cheackoutCart.punto.value,
    total: calcularTotal(productos)
  };
  fetch("/checkout",{
    method : "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(formData)
  })
    .then((r) => r.json())
    .then((res) => {
      if(res.ok){
        vaciarCarrito()
        location.href = `/order/${res.order.id}`
      }
    })
}