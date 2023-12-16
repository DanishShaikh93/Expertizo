let cartProductsSec=document.querySelector(".cartProductsSec");
let productSec= document.querySelector(".product-sec");
let apiData;
let cartProductObj=[];
axios.get('https://fakestoreapi.com/products')
.then(function (response){
     apiData=response.data;
   // console.log(apiData);
for(let i=0; i<=apiData.length; i++){
    productSec.innerHTML+= `
    
    <div class="card mb-3 p-3" style="width: 22%;">
  <img src="${apiData[i].image}" alt="product image">
  <div class="card-body">
    <h5 class="card-title">${apiData[i].title}</h5>
    <h6 class="price">$${apiData[i].price}</h6>
    <p class="card-text">${apiData[i].description}</p>
    <button onclick="addToCart(${i})" class="btn btn-warning m-2">Add to Cart</button>
  </div>
</div>

    `;
}


}).catch(function (error) {
   console.log(error); 
})


let totalPriceSec=document.querySelector("#total-price-sec");

function addToCart(i) {
  let totalPrice=0;
let selectedObj=apiData[i];
cartProductObj.push(selectedObj);
console.log(cartProductObj);
let myModal = new bootstrap.Modal(document.getElementById('myModal'));
myModal.show();
cartProductsSec.innerHTML="";
totalPriceSec.innerHTML=``;

for (let j = 0; j < cartProductObj.length; j++) {
    cartProductsSec.innerHTML+=`
    
    <div class="cartPro-box">
    <img src="${cartProductObj[j].image}" alt="product image">
    <h6>${cartProductObj[j].title} </h6>
    <p><span style='color:red;'>$${cartProductObj[j].price}</span> </p>
    <button onclick="removeFromCart(${j})" class="btn btn-warning rm-btn">X</button>
    </div>
    `;
    totalPrice += cartProductObj[j].price; 
    totalPriceSec.innerHTML=`Total Price:  <span>$${totalPrice.toFixed(2)}</span>`  
    } 


    
  

}

function removeFromCart(j) {
  let totalPriceAfterRemove=0;
  cartProductsSec.innerHTML=``;
  totalPriceSec.innerHTML=``;
 let removeItem=cartProductObj;
 removeItem.splice(j,1);
 
if(cartProductObj.length !== 0){
  for (let k = 0; k < cartProductObj.length; k++) {
  cartProductsSec.innerHTML+=`
  
  <div class="cartPro-box">
  <img src="${cartProductObj[k].image}" alt="product image">
  <h6>${cartProductObj[k].title} </h6>
  <p><span style='color:red;'>$${cartProductObj[k].price}</span> </p>
  <button onclick="removeFromCart(${k})" class="btn btn-warning rm-btn">X</button>
  </div>
  `;
  totalPriceAfterRemove += cartProductObj[k].price; 
  totalPriceSec.innerHTML=`Total Price:  <span>$${totalPriceAfterRemove.toFixed(2)}</span>` 
} 
}else{
  cartProductsSec.innerHTML=`<span style="color:red;">Cart is empty!</span>`;
  
}
 

}







