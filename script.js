
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closecart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", ()=>{
    cart.classList.add("active");
});

closecart.addEventListener("click",()=>{
    cart.classList.remove("active")
});

if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded",start);
}else{
    start();
}

function start(){
    addEvent();
}

function update(){
    addEvent();
    updateTotal();
}
function addEvent(){
    let cartRemove_btns = document.querySelectorAll(".cart-remove");

    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) =>{
        btn.addEventListener("click", handle_removeCartItem);
    });

    let cartQuantity_inputs= document.querySelectorAll(".cart-quantity");

    cartQuantity_inputs.forEach((input)=>{
        input.addEventListener("change", handle_changeItemQuantity);

    });

    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });
}

const buy_btn = document.querySelector("btn.buy");
buy_btn.addEventListener("click", handle_buyOrden);

let itemsAdded = [];

function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;

    console.log(title,price,imgSrc);
    let newToAdd ={
        title,
        price,
        imgSrc,
    };
    
    if(itemsAdded.find((el) => el.title == newToAdd.title)){
        alert("Este Articulo ya existe");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }
    
    let carBoxElemnt = carBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML =carBoxElemnt;
    const cartContent = cart.querySelector(".cart-contnt");
    cartContent.appendChild(newNode);
    
    update();
}

function handle_removeCartItem(){
    this.parentElement.remove();

    itemsAdded = itemsAdded.filter(
        (el) => el.title != this.parentElement.querySelector(".cart-product-title").innerHTML
    );

    update();
}

