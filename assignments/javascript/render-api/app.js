let cartProductsSec=document.querySelector(".cartProductsSec");
let productSec= document.querySelector(".product-sec");
let apiData;
let cartProductObj=[];
// axios.get('http://fakestoreapi.com/products')
axios.get('https://api.escuelajs.co/api/v1/products')
.then(function (response){
     apiData=response.data;
    console.log(apiData);
for(let i=0; i<=apiData.length; i++){
    productSec.innerHTML+= `
    
    <div class="card mb-3 p-3" style="width: 22%;">
  <img src="${apiData[i].images[0]}" alt="product image">
  <div class="card-body">
    <h5 class="card-title">${apiData[i].title}</h5>
    <h6 class="price">$${apiData[i].price}</h6>
    <p class="card-text">${apiData[i].description}</p>
    <button onclick="addToCart(${i})" class="btn btn-primary m-2">Add to Cart</button>
  </div>
</div>

    `;
}


}).catch(function (error) {
   console.log(error); 
})


let totalPriceSec=document.querySelector("#total-price-sec");
let totalPrice=0;
function addToCart(i) {
let selectedObj=apiData[i];
selectedObj.slice;
cartProductObj.push(selectedObj);
console.log(cartProductObj);
let myModal = new bootstrap.Modal(document.getElementById('myModal'));
myModal.show();
cartProductsSec.innerHTML="";

for (let j = 0; j < cartProductObj.length; j++) {
    cartProductsSec.innerHTML+=`
    
    <div class="cartPro-box">
    <img src="${cartProductObj[j].image}" alt="product image">
    <h6>${cartProductObj[j].title} </h6>
    <p>$${cartProductObj[j].price} </p>
    <p>$${totalPrice += cartProductObj[j].price}</p>
    </div>
    `;
  
console.log(totalPrice);
     
    
    } 


    
  

}







