'use strict';


let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let centerImgEl = document.getElementById('centerImg');
let rightImgEl = document.getElementById('rightImg');
containerEl.appendChild(leftImgEl);
containerEl.appendChild(centerImgEl);
containerEl.appendChild(rightImgEl);




let attempts = 1;
let maxAttempts = 25;
let checkImages = [];
let products = [];
let productsNames = [];
let votes = [];
let views = [];






function Product(productName) {
  this.productName = productName.split('.')[0];
  this.img = 'images/' + productName;
  this.votes = 0;
  this.views = 0;

  productsNames.push(this.productName);
  products.push(this);
  saveToLocalStorage();
}


let productImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];


for (let i = 0; i < productImages.length; i++) {
  new Product(productImages[i]);
}

function randomIndex() {

  return Math.floor(Math.random() * products.length);

}


let leftIndex;
let centerIndex;
let rightIndex;



function renderRandomImg() {
  leftIndex = randomIndex();
  centerIndex = randomIndex();
  rightIndex = randomIndex();



  while ((leftIndex === centerIndex) || (leftIndex === rightIndex) || (centerIndex === rightIndex) || checkImages.includes(leftIndex) || checkImages.includes(centerIndex) || checkImages.includes(rightIndex)) {
    leftIndex = randomIndex();
    centerIndex = randomIndex();
    rightIndex = randomIndex();

  }

  leftImgEl.setAttribute('src', products[leftIndex].img);
  products[leftIndex].views++;
  saveToLocalStorage();
  centerImgEl.setAttribute('src', products[centerIndex].img);
  products[centerIndex].views++;
  saveToLocalStorage();
  rightImgEl.setAttribute('src', products[rightIndex].img);
  products[rightIndex].views++;
  saveToLocalStorage();
  leftImgEl.setAttribute('alt', products[leftIndex].productName);
  centerImgEl.setAttribute('alt', products[centerIndex].productName);
  rightImgEl.setAttribute('title', products[rightIndex].productName);
  rightImgEl.setAttribute('alt', products[rightIndex].productName);
  leftImgEl.setAttribute('title', products[leftIndex].productName);
  centerImgEl.setAttribute('title', products[centerIndex].productName);






}
renderRandomImg();









leftImgEl.addEventListener('click', handleClicks);
centerImgEl.addEventListener('click', handleClicks);
rightImgEl.addEventListener('click', handleClicks);


function handleClicks(event) {
  if (attempts <= maxAttempts) {
    let clickedImg = event.target.id;
    if (clickedImg === 'leftImg') {
      products[leftIndex].votes++;
      saveToLocalStorage();
    } else if (clickedImg === 'centerImg') {
      products[centerIndex].votes++;
      saveToLocalStorage();
    } else if (clickedImg === 'rightImg') {
      products[rightIndex].votes++;
      saveToLocalStorage();
    }
    renderRandomImg();
  } else {
    let ulEl = document.getElementById('results');
    for (let i = 0; i < products.length; i++) {
      let liEl = document.createElement('li');
      liEl.textContent = `${products[i].productName} has ${products[i].votes} votes and ${products[i].views} views .`;
      ulEl.appendChild(liEl);
      votes.push(products[i].votes);
      views.push(products[i].views);
    }
    leftImgEl.removeEventListener('click', handleClicks);
    centerImgEl.removeEventListener('click', handleClicks);
    rightImgEl.removeEventListener('click', handleClicks);
    chartRender();
  }
  attempts++;
}





function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsNames,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2
      },
      {
        label: '# of views',
        data: views,
        backgroundColor: [
          'rgba(155, 199, 132, 0.2)',
        ],
        borderColor: [
          'rgba(155, 199, 120, 0.2)',
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


// adding local storage
function saveToLocalStorage() {
  let dataStored = JSON.stringify(products);
  localStorage.setItem('products', dataStored);

}

function readFromLocalStorage(){
  let stringObject=localStorage.getItem('products');
  let normalObject=JSON.parse(stringObject);
  if(normalObject !== null){
    products=normalObject;
  }
}

readFromLocalStorage();
