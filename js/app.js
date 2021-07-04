'use strict';


let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let centerImgEl = document.getElementById('centerImg');
let rightImgEl = document.getElementById('rightImg');
containerEl.appendChild(leftImgEl);
containerEl.appendChild(centerImgEl);
containerEl.appendChild(rightImgEl);

let attempts = 1;
let maxAttempts=25;

let products = [];
function Product(productName) {
  this.productName = productName.split('.')[0];
  this.img = 'images/' + productName;
  this.votes = 0;

  products.push(this);
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
  while(leftIndex===rightIndex || leftIndex===centerIndex){
    leftIndex = randomIndex();
  }
  leftImgEl.setAttribute('src',products[leftIndex].img);
  centerImgEl.setAttribute('src',products[centerIndex].img);
  rightImgEl.setAttribute('src',products[rightIndex].img);
  leftImgEl.setAttribute('alt',products[leftIndex].productName);
  centerImgEl.setAttribute('alt',products[centerIndex].productName);
  rightImgEl.setAttribute('alt',products[rightIndex].productName);
  leftImgEl.setAttribute('title',products[leftIndex].productName);
  centerImgEl.setAttribute('title',products[centerIndex].productName);
  rightImgEl.setAttribute('title',products[rightIndex].productName);


}
renderRandomImg();
leftImgEl.addEventListener('click',handleClicks);
centerImgEl.addEventListener('click',handleClicks);
rightImgEl.addEventListener('click',handleClicks);

function handleClicks(event){
  if(attempts<=maxAttempts){
    let clickedImg= event.target.id;
    if(clickedImg==='leftImg'){
      products[leftIndex].votes++;
    }else if(clickedImg==='centerImg'){
      products[centerIndex].votes++;
    }else if(clickedImg==='rightImg'){
      products[rightIndex].votes++;
    }
    renderRandomImg();
  }else{
    let ulEl = document.getElementById('results');
    for (let i = 0; i < products.length; i++) {
      let liEl = document.createElement('li');
      liEl.textContent = `${products[i].productName} has ${products[i].votes} votes and ${products[i].views} views .`;
      ulEl.appendChild(liEl);
    }
    leftImgEl.removeEventListener('click', handleClicks);
    centerImgEl.removeEventListener('click', handleClicks);
    rightImgEl.removeEventListener('click', handleClicks);
  }
  attempts++;
}
