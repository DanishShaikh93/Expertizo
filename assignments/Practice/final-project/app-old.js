let result = document.querySelector(".result");
let apiData;
axios.get('https://fakestoreapi.com/products')
  .then(function (response) {
    apiData = response.data;
    console.log(apiData);
    apiData.forEach((product, id) => {
      result.innerHTML += `
       <div>
       <img src="${product.image}" height="100"/>
       <h3>${product.title}</h3>
       <h4>${product.price}</h4>
       <button onclick="addToCart(${id})">Add To Cart</button>
       </div>
       `;

    });
  }).catch(function (err) {
    console.log(err);
  });





let cartProducts;

//This condition check the local stroge is empty or not if local storage have some products this condition will merge the local storage array of object with current add to card products array of object so we can save again the merge data to local storge. If local storage have no data yet so we will leave the cartProduct variable empty until it will save new product through addToCart() function.
let cartStorage = JSON.parse(localStorage.getItem('cartItems'));
if (Array.isArray(cartStorage) && cartStorage.length > 0) {
  cartProducts = [...cartStorage];
} else {
  cartProducts = [];
}



//cart products quantity condition checks that user have already cart item on local storage than show its quantity
let basket = document.querySelector(".basket");
if(cartProducts.length > 0){
  let itemQty = cartProducts.length;
  basket.innerHTML = `Total Items ${itemQty}`;
}else{
  let itemQty=0;
  basket.innerHTML = `Total Items ${itemQty}`;
}



//Get Specific Product Object When Click Add To Cart
function addToCart(index) {
  cartProducts.push(apiData[index]);
  console.log(cartProducts);

  //cart products quantity condition when user add new product
  if(cartProducts.length > 0){
    let itemQty = cartProducts.length;
    basket.innerHTML = `Total Items ${itemQty}`;
  }else{
    let itemQty=0;
    basket.innerHTML = `Total Items ${itemQty}`;
  }
}

//proceed to checkout function all item which are already pushed in cart will save to local storage and redirect to cart page after this function execute.
let cartBtn = document.querySelector(".cartBtn");
cartBtn.addEventListener('click', () => {
  //console.log(cartItem);
  localStorage.setItem('cartItems', JSON.stringify(cartProducts));
  window.location = 'cart.html'
})
