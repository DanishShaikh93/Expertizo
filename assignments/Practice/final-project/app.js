let result = document.querySelector(".result");
let apiData;
axios.get('https://fakestoreapi.com/products')
  .then(function (response) {
    apiData = response.data;
    //console.log(apiData);
    apiData.forEach((product, id) => {
      result.innerHTML += `
       <div>
       <img src="${product.image}" height="100"/>
       <h3>${product.title}</h3>
       <h4>${product.price}</h4>
       <button onclick="addToCart(${product.id}, ${id})">Add To Cart (${product.id})</button>
       </div>
       `;

    });
  }).catch(function (err) {
    console.log(err);
  });




let cartStorage = [];
console.log("By default cart Storage is blank ", cartStorage);

//Get Specific Product Object When Click Add To Cart
function addToCart(id, index) {

let items = JSON.parse(localStorage.getItem('cartItems'));

if(Array.isArray(items) && items.length > 0){

          //find function check the object key id:value if already in storage create the variable duplicate_Product_Index and save that product object index in array for e.g [ 0{object}, 1{object}, 2{object}]  
          if(items.find(items => items.id === id)){
          let duplicate_Product_Index= items.findIndex(items => items.id === id);

          //If id already exist ++ the qty key value of that product
          cartStorage[duplicate_Product_Index].qty++;
          console.log("If id already exist ++ the qty key value of that product", cartStorage);

          }else{
            cartStorage.push({...apiData[index] , qty: 1});
            console.log("if Array.isArray(items) && items.length > 0 and id key value is not match push the qty key value to add 1 only and push that new product to cartStorage=[]", cartStorage);
          }


}else if(cartStorage.length > 0){ 
          //we use same condition which we use in this if(Array.isArray(items) && items.length > 0){} but this we find and match product in cartStorage=[] because cartStorage.length > 0
          if(cartStorage.find(cartStorage => cartStorage.id === id)){
            let duplicate_Product_Index= cartStorage.findIndex(cartStorage => cartStorage.id === id);
          
          //If id already exist ++ the qty key value of that product
            cartStorage[duplicate_Product_Index].qty++;
            console.log("If id already exist ++ the qty key value of that product", cartStorage);
          
          }else{
            cartStorage.push({...apiData[index] , qty: 1});
            console.log("if cartStorage.length > 0 and id key value is not match push the qty key value to add 1 only and push that new product to cartStorage=[]", cartStorage);
          }
}else{
  //If local storage have no data else push the add to card product to cartStorage's blank array.
  cartStorage.push({...apiData[index] , qty: 1});
  console.log("Fresh Data ", cartStorage);
}

  //cartProducts.push(apiData[index]);
  //console.log(cartProducts);

  //cart products quantity condition when user add new product
  // if(cartProducts.length > 0){
  //   let itemQty = cartProducts.length;
  //   basket.innerHTML = `Total Items ${itemQty}`;
  // }else{
  //   let itemQty=0;
  //   basket.innerHTML = `Total Items ${itemQty}`;
  // }
}

//proceed to checkout function all item which are already pushed in cart will save to local storage and redirect to cart page after this function execute.
let cartBtn = document.querySelector(".cartBtn");
cartBtn.addEventListener('click', () => {
  localStorage.setItem('cartItems', JSON.stringify(cartStorage));
  // window.location = 'cart.html'
})
