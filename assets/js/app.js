const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: '../assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: '../assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: '../assets/images/featured3.png',
      category: "sweatshirts",
      quantity: 20
    }
  ];

  /*=================================== */
    let carrito = [];
    let cantidadProductos = {};
    const contenedorCarrito = document.getElementById("product-list-cart");
    const vaciarCarrito = document.getElementById("clear-cart");
    const contenedorProductos = document.getElementById("list-products");
    const contadorCarrito = document.getElementById("cart-counter");
    const contadorItemsCarrito = document.getElementById("checkout-items");
    const precioTotal = document.getElementById("checkout-price");

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


vaciarCarrito.addEventListener('click',  () => {
    carrito.length = 0;
    actualizarCarrito()
})

items.forEach((producto ) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
            <div class="product-cart">
                <div class="product-img">
                    <img src="${producto.image}" alt="">
                </div>
                <div class="product-info">
                    <div class="btn-product">
                        <button id="add-product${producto.id}" class="add-product"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div class="product-details">
                        <h3 class="price-product"> $ ${producto.price} .00</h3> 
                        <p class="stock-product">| Stock: ${producto.quantity}   </p>
                        <p class="name-product"> ${producto.name}</p>
                       
                    </div>
                </div>
            </div>
    `
    contenedorProductos.appendChild(div);
    
    const boton = document.getElementById(`add-product${producto.id}`)

       boton.addEventListener('click', () => {
        addCarrito(producto.id)
        actualizarCarrito()
        console.log(carrito);
    });
});

const addCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)
    if(existe){
        const prod = carrito.map (prod => {
         if(prod.id === prodId)   {
            prod.cantidad++
         }
        })

    }else{
        const productoItem = items.find((prod) => prod.id === prodId)
        carrito.push(productoItem)
        console.log(carrito);
    }

    actualizarCarrito()
    
}
    

    const eliminarDelCarrito = (prodId) => {
    const deleteItem = carrito.find((prod) => prod.id === prodId )
    const indice = carrito.indexOf(deleteItem)
    carrito.splice(indice, 1)
    
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) =>{
        const div = document.createElement("div")
        div.classname = ("product-list-cart")
        div.innerHTML = `
            <div class="product-list-cart-img">
                    <img src="${prod.image}" alt="">
                </div>
                <div class="product-info-cart">
                    <div class="product-list-cart-name">
                        <p>${prod.name}</p>
                    </div>
                    <div class="product-list-cart-stock">
                        <p>Stock: ${prod.quantity} | $${prod.price}.00</p>
                    </div>
                    <div class="product-list-cart-subtotal">
                        <p> Subtotal: $</p>
                    </div>
                    <div class="product-list-cart-addItems">
                        <div class="controls-items-cart-products">
                            <i class="fa-solid fa-minus" onclick="eliminarDelCarrito(${prod.id})"></i>
                            <p class="quantity-items">${prod.quantity}</p>
                            <i class="fa-solid fa-plus" onclick="actualizarCarrito(${prod.id})"></i>
                        </div>
                        <div class="delete-product-list" onclick="eliminarDelCarrito(${prod.id})">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length;
    contadorItemsCarrito.innerText = carrito.length + ` Articulos`
    precioTotal.innerText = `$ ${carrito.reduce((acumulador, prod) => parseInt(acumulador) + parseInt(prod.price), 0)}`
    console.log(precioTotal);
}



/*=======  CARRITO =========== */
const cartOpen = document.getElementById( "cart-open" )
const cartClose = document.getElementById( "close-cart" )
const cartContainer = document.getElementById( "cart-container" )

cartOpen.addEventListener( "click", () => {
    cartContainer.classList.remove( "hide" )
})

cartClose.addEventListener( "click", () => {
    cartContainer.classList.add( "hide" )
})

/*==================== MENU =====================*/

const menu = document.querySelector("ul.nav-menu");
const iconMenu = document.getElementById("icon-menu");
const itemMenu1 = document.getElementById("url1");
const itemMenu2 = document.getElementById("url2");

iconMenu.addEventListener ("click", () => 
    menu.classList.toggle("active")
);

itemMenu1.addEventListener ( "click" , () =>
    menu.classList.remove("active")
);

const navBar = document.getElementById("nav-container")

window.addEventListener( "scroll", () =>{
    if( window.scrollY >= 50 ){
        navBar.classList.add("scroll-header")
    }else{
        navBar.classList.remove("scroll-header")
    }
})

/*=======================================DARK THEME========================== */

function darkTheme() {
    const themeButton = document.getElementById( "theme-button" )

    themeButton.addEventListener( "click", () =>{
        document.body.classList.toggle( "dark-theme" )

        if( themeButton.classList.contains( "fa-moon" ) ){
            themeButton.classList.replace( "fa-moon", "fa-sun" )
        }else{
            themeButton.classList.replace( "fa-sun", "fa-moon" )
        }
    })
}