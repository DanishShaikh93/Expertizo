const phones = [
    {
        imgurl: 'm1.jpg',
        brand: 'Samsung',
        model: 'S20',
        ram: 8,
        rom: 256,
        camera: '20 megapixel',
        price: 15000
    },
    {
        imgurl: 'm2.png',
        brand: 'Xiomi',
        model: 'note10',
        ram: 4,
        rom: 64,
        camera: '10 megapixel',
        price: 15000
    },
    {
        imgurl: 'm3.jpg',
        brand: 'Infinix',
        model: 'z10',
        ram: 2,
        rom: 16,
        camera: '5 megapixel',
        price: 15000
    },
    {
        imgurl: 'm4.jpg',
        brand: 'Tecno',
        model: 'spark10',
        ram: 12,
        rom: 512,
        camera: '25 megapixel',
        price: 15000
    },
    {
        imgurl: 'm5.jpg',
        brand: 'Iphone',
        model: '14',
        ram: 4,
        rom: 1024,
        camera: '30 megapixel',
        price: 15000
    },
    {
        imgurl: 'm6.png',
        brand: 'Oppo',
        model: 'F11',
        ram: 8,
        rom: 256,
        camera: '20 megapixel',
        price: 15000
    },
    {
        imgurl: 'm7.png',
        brand: 'Vivo',
        model: 'y20',
        ram: 4,
        rom: 64,
        camera: '8 megapixel',
        price: 15000
    },
    {
        imgurl: 'm8.webp',
        brand: 'Nokia',
        model: 's50',
        ram: 50,
        rom: 1024,
        camera: '60 megapixel',
        price: 300000
    },

]

let mobSec=document.querySelector(".mob-sec");
for(let i=0; i<=phones.length; i++){
   // console.log(phones[i].brand);
    mobSec.innerHTML+=`
    <div class="mob-box">
    <img src="assets/images/${phones[i].imgurl}"/>
    <h3><span class="font-bold text-lg">Brand:</span> ${phones[i].brand}</h3>
    <p><span class="font-bold text-lg">Model:</span> ${phones[i].model}</p>
    <p><span class="font-bold text-lg">RAM:</span> ${phones[i].ram}</p>
    <p><span class="font-bold text-lg">ROM:</span> ${phones[i].rom}</p>
    <p><span class="font-bold text-lg">Camera:</span> ${phones[i].camera}</p>
    <p><span class="font-bold text-lg">Price:</span> ${phones[i].price}</p>
    <button onclick='addToCart(${i})' class="btn btn-primary mt-3">Add to Cart</button>
    </div>
    `;
}

function addToCart (i){
    console.log(phones[i]);
}