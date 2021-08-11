const cards = document.querySelectorAll('.memory-card');
const reload_btn = document.getElementById('reload-btn');
const audio = new Audio('./audio/assemble.mp3');
const pBar = document.getElementById("myBar");
const result = document.getElementById('result');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let finish_count=0;
let try_count=0;


const moveProgress = (width)=>{
  progress = (width*100)/6;
  setInterval(() => {
    
  }, 1000);
  pBar.style.width = progress + "%";
  pBar.innerHTML = Math.round(progress) + "%";
  if(progress==100)
    result.innerHTML="Total Attempts: "+try_count;
}

function flipCard(){
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  try_count++;
  secondCard = this;
  checkForMatch();
}

const checkForMatch = ()=>{
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;

  isMatch ? disableCards() : unflipCards();
}

const disableCards = ()=>{
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  finish_count++;
  moveProgress(finish_count);
    if(finish_count === 6)
        audio.play(); 
  resetBoard();
}

const unflipCards = ()=>{
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    
    resetBoard();
  }, 1500);
}

const resetBoard = ()=>{
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

const reload =()=> window.location.reload(true);

reload_btn.addEventListener('click', reload);
cards.forEach(card => card.addEventListener('click', flipCard));


