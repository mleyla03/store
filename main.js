const btn = document.getElementsByClassName('btn')

const products = []

for(var i = 0; i < btn.length; i++){
    let cartBtn = btn[i]
    cartBtn.addEventListener('click', (e) =>{
        let product = {
            image: e.target.parentElement.parentElement.children[0].children[0].src,
            name: e.target.parentElement.parentElement.children[1].children[0].textContent,
            price: e.target.parentElement.parentElement.children[2].children[0].textContent,
            totalPrice: parseInt(e.target.parentElement.parentElement.children[2].children[0].textContent) ,
            quantity: 1
        }
        
        addItemToLocal(product)

    })
}
function addItemToLocal(product){
let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
if(cartItem === null){
products.push(product)
localStorage.setItem('prdInCart', JSON.stringify(products))

}else{
    cartItem.forEach(item => {
        if(product.name == item.name){
            product.quantity = item.quantity += 1;
            product.totalPrice = item.totalPrice += product.totalPrice;
        }else{
            products.push(item)
        }
    });
    products.push(product)
}
localStorage.setItem('prdInCart', JSON.stringify(products))
window.location.reload()
}
function cartNumberDisplay(){
    let cartNumbers = 0;
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    cartItem.forEach(item => {
        cartNumbers = item.quantity += cartNumbers;
    });
    console.log(cartNumbers);
    document.querySelector('.nav span').textContent = cartNumbers;
}
cartNumberDisplay()




function dispCartItem(){
    let html = '';
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    cartItem.forEach(item => {
        html += `
        <div class="cartlist">
        <div class="forImage"> <img src="${item.image}" alt=""></div>
        <div class="forName"><h3>${item.name}</h3></div>
        <div class="forPrice"><h3>${item.price}</h3><span>$</span></div>
        <div class="forQuantity">${item.quantity}</h3></div>
        <div class="forTotal"><h3>${item.totalPrice}</h3><span>$</span></div>
                
         <div class="reoveItem"><button><i class="fa-solid fa-xmark"></i></button></div>
        
   </div>
        `
    });
   document.querySelector('.cartdisp').innerHTML = html;
}
dispCartItem()



const removeItem = document.getElementsByClassName('reoveItem')
for(var i = 0; i < removeItem.length; i++){
    let removeBtn = removeItem[i]
    removeBtn.addEventListener('click', (event) =>{
        let cartItem = JSON.parse(localStorage.getItem('prdInCart')) 
        cartItem.forEach(item => {
            if(item.name != event.target.parentElement.parentElement.children[1].children[0].textContent){
                products.push(item) 
            } 
      
        })
       
       
  
       
        
        localStorage.setItem('prdInCart', JSON.stringify(products))    
       window.location.reload()
       
   

        
    })
}

function cartPrice(){
    let subTotal = 0;
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    cartItem.map(item =>{
    subTotal = item.totalPrice += subTotal;
    
        })
     console.log(  subTotal);
     document.querySelector('.priceView h2').textContent = subTotal
 }
 cartPrice()
