const data = [
  {
    name: "Casual Shirt",
    src: "./img-1.jpg",
    price: 45,
    id: 0,
  },
  {
    name: "Office Shirt",
    src: "./img-2.jpg",
    price: 100,
    id: 1,
  },
  {
    name: "T Shirt",
    src: "./img-3.jpg",
    price: 25,
    id: 2,
  },
  {
    name: "Mens Suit",
    src: "./img-4.jpg",
    price: 300,
    id: 3,
  },
  {
    name: "Mens Tie",
    src: "./img-5.png",
    price: 25,
    id: 4,
  },
  {
    name: "Casual Shoes",
    src: "./img-6.png",
    price: 200,
    id: 5,
  },
  {
    name: "Black Suit",
    src: "./img-7.png",
    price: 450,
    id: 6,
  },
  {
    name: "Polo Shirt",
    src: "./img-8.png",
    price: 45,
    id: 7,
  },
  {
    name: "Denim Shirt",
    src: "./img-9.png",
    price: 85,
    id: 8,
  },
  {
    name: "Denim Pants",
    src: "./img-10.png",
    price: 120,
    id: 9,
  },
  {
    name: "Basic Cap",
    src: "./img-11.png",
    price: 35,
    id: 10,
  },
  {
    name: "Leather Boots",
    src: "./img-12.png",
    price: 350,
    id: 11,
  },
];
//Variables
const totalBill = document.getElementById("totalBill");
// const checkOut=document.getElementById('checkOut')
const clearCart=document.getElementById('clearCart')
const second = document.getElementById("second");
const bought = document.getElementById("bought");
const cart = document.getElementById("cart");
const zero = document.getElementById("zero");
const info = document.getElementById("info");
const boughtDiv = document.getElementById("boughtDiv");
const backDiv = document.getElementById("backDiv");
const back = document.getElementById("back");
const main = document.getElementById("main");

main.innerHTML = data
  .map(({ src, name, price }) => {
    return `<figure>
                <img src='${src}'>
                <div class='padding'>
                    <figcaption>${name}</figcaption>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <div class="line">
                        <span class='price'>$${price}</span>
                        <div class='change'>
                            <button class='minus'>-</button>
                            <p class='num'>0</p>
                            <button class='plus'>+</button>
                        </div>
                    </div>        
                </div>        
            </figure>`;
  })
  .join("");

bought.innerHTML = data
  .map(({ src, name, price }) => {
    return `
            <figure class='item'>
                <img src='${src}'>
                <div class='padding'>
                    <div class='one'>
                        <figcaption>${name}</figcaption>
                        <span class='price'>$ ${price}</span>
                        <span></span>
                        <button class='quit'>X</button>    
                    </div>
                    <div class='two'>
                        <button class='minus'>-</button>
                        <p class='num'>0</p>
                        <button class='plus'>+</button>
                    </div>
                    <span class='total'>$${price}</span>
                </div>    
            </figure>
    `;
  })
  .join("");

const arrayItems = [...document.getElementsByClassName("item")];
arrayItems.forEach((element) => (element.style.display = "none"));

//El codigo empieza a partir de aqui
const boughtPlusButtons = [...document.querySelectorAll("#bought .plus")];
const boughtMenusButtons = [...document.querySelectorAll("#bought .minus")];
const mainPlusButtons = [...document.querySelectorAll("#main .plus")];
const mainMenusButtons = [...document.querySelectorAll("#main .minus")];
const boughtNum = [...document.querySelectorAll("#bought .num")];
const mainNum = [...document.querySelectorAll("#main .num")];
const total = [...document.querySelectorAll("#bought .total")];
const quit = [...document.querySelectorAll("#bought .quit")];
const boughtClothes = [];
const boughtObj = {};
for (let i = 0; i < 12; i++) {
  boughtObj[i] = false;
}

//Quit All
const quitAll=(index)=>{
    if(boughtClothes[index]){
        boughtClothes[index].number=0
        boughtNum[index].textContent = 0
        mainNum[index].textContent = 0
        total[index].textContent = 0
        boughtObj[index] = false;
        renderZero()
        displayButtons()
        calculateTotalBill()
        arrayItems[index].style.display='none'
    }
}

//clear function
const clearFunction=()=>{
    for (let i=0;i<boughtClothes.length;i++){
        quitAll(i)
    }
}

//Calculate total bill
const calculateTotalBill = () => {
    let sum = 0;
    for (let i = 0; i < boughtClothes.length; i++) {
        if (boughtClothes[i]) { // Asegúrate de que el elemento existe
            sum += boughtClothes[i].number * data[boughtClothes[i].id].price;
        }
    }
    totalBill.textContent = sum;
};

//Render zero
const renderZero = () => {
    let sum = 0;
    for (let i = 0; i < boughtClothes.length; i++) {
        if (boughtClothes[i]) { // Verifica si el elemento no es undefined
            sum += boughtClothes[i].number;
        }
    }
    zero.textContent = sum;
};

//Display buttons
const displayButtons = () => {
    const estus = Object.values(boughtObj);
    const response = estus.some(el => el === true); // Retornar directamente el resultado de la comparación
    boughtDiv.style.display = response ? 'block' : 'none';
    backDiv.style.display = response ? 'none' : 'block';
};

//Add or Sum function
const addOrSum = (item) => {
  if (boughtObj[item]) {
    boughtClothes[item].number++;
  } else {
    boughtObj[item] = true;
    boughtClothes[item] = { id: item, number: 1 };
    arrayItems[item].style.display = "flex";
  }
  boughtNum[item].textContent = boughtClothes[item].number;
  mainNum[item].textContent = boughtClothes[item].number;
  total[item].textContent = boughtClothes[item].number * data[item].price;
  renderZero()
  calculateTotalBill()
};

//Rest or quit function
const restOrQuit = (item) => {
  if (boughtObj[item] && boughtClothes[item].number > 0) {
    if (boughtClothes[item].number > 1) {
        boughtClothes[item].number--;
    } else {
        boughtClothes[item].number=0
        boughtObj[item] = false;
        arrayItems[item].style.display = "none";
    }
    boughtNum[item].textContent = boughtClothes[item].number;
    mainNum[item].textContent = boughtClothes[item].number;
    total[item].textContent = boughtClothes[item].number * data[item].price;
    renderZero()
    displayButtons()
    calculateTotalBill()
  }
};

//Event Listeners
cart.addEventListener("click", () => {
  second.style.display = "block";
  main.style.display = "none";
  displayButtons()
});

info.addEventListener("click", () => {
  second.style.display = "none";
  main.style.display = "flex";
});
back.addEventListener("click", () => {
  second.style.display = "none";
  main.style.display = "flex";
});

boughtPlusButtons.forEach((element, index) => {
  element.onclick = () => {
    addOrSum(data[index].id);
  };
});
mainPlusButtons.forEach((element, index) => {
  element.onclick = () => {
    addOrSum(data[index].id);
  };
});
boughtMenusButtons.forEach((element, index) => {
  element.onclick = () => {
    restOrQuit(data[index].id);
  };
});
mainMenusButtons.forEach((element, index) => {
  element.onclick = () => {
    restOrQuit(data[index].id);
  };
});
quit.forEach((el,index)=>{
    el.addEventListener('click',()=>{
        quitAll(index)
    })
})
clearCart.onclick=clearFunction