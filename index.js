let player = {
  name: "Player, Goodluck!",
};

let dealer = {
  name: "Dealer",
};

let cards = [];
let sum = 0;
let dealerCards = [];
let dealerSum = 0;
let hasBlackjack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let drawCardEl = document.getElementById("newcard-btn");
let playerEl = document.getElementById("player-el");
let dealerEl = document.getElementById("dealer-el");
let dealerCardsEL = document.getElementById("dealerCardsEl");
let dealerSumEl = document.getElementById("dealerSumEl");
let chipsEL = document.getElementById("chipsEl");
let chips = 500;
dealerEl.textContent = dealer.name;
playerEl.textContent = player.name;
chipsEL.textContent = "Chips: " + chips;

function getRandomCard() {
  let randomCard = Math.floor(Math.random() * 13) + 1;
  if (randomCard > 10) {
    return 10;
  } else if (randomCard === 1) {
    return 11;
  } else {
    return randomCard;
  }
}

function getRandomDealerCard() {
  let randomDealerCard = Math.floor(Math.random() * 13) + 1;
  if (randomDealerCard > 10) {
    return 10;
  } else if (randomDealerCard === 1) {
    return 11;
  } else {
    return randomDealerCard;
  }
}

function startGame() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  let dealerFirstCard = getRandomDealerCard();
  let dealerSecondCard = getRandomDealerCard();
  cards = [firstCard, secondCard];
  dealerCards = [dealerFirstCard, dealerSecondCard];
  sum = firstCard + secondCard;
  dealerSum = dealerFirstCard + dealerSecondCard;
  play();
  dealerPlay();
}

function dealerPlay() {
  dealerCardsEl.textContent = "Dealer Cards:";
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardsEl.textContent += dealerCards[i] + " ";
  }
  dealerSumEl.textContent = "Sum:" + dealerSum;
  if (dealerSum === 21) {
    message = "You lose!";
    hasBlackjack = true;
    isAlive = false;
    playerLost();
  } else if (dealerSum < 17) {
    isAlive = true;
    hasBlackjack = false;
    dealerDraw();
  } else if (dealerSum > 21) {
    message = "Dealer Bust!";
    isAlive = false;
    dealerBust();
  } else if (dealerSum > 16 && dealerSum < 21) {
    isAlive = true;
    hasBlackjack = false;
  }
  messageEl.textContent = message;
}

function play() {
  cardsEl.textContent = "Cards:";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
  sumEl.textContent = "Sum:" + sum;
  if (sum <= 20) {
    message = "Do you want to hit?";
    isAlive = true;
  } else if (sum === 21) {
    message = "Blackjack!";
    hasBlackjack = true;
    isAlive = false;
    playerBlackjack();
  } else if (sum > 21) {
    message = "Sorry you bust";
    isAlive = false;
    playerLost();
  } else if (sum < 21 && sum > dealerSum) {
    message = "You Win!";
    isAlive = false;
    playerWon();
  }
  messageEl.textContent = message;
}

function dealerDraw() {
  let newDealerCard = getRandomDealerCard();
  dealerCardsEl.textContent = "Cards:";
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardsEl.textContent += dealerCards[i] + " ";
  }
  dealerSum += newDealerCard;
  dealerCards.push(newDealerCard);
  dealerSumEl.textContent = "Dealer Sum:" + dealerSum;
  dealerPlay();
}

function draw() {
  if (isAlive === true && hasBlackjack === false) {
    let newCard = getRandomCard();
    drawCardEl.textContent = "Drawing new card";
    cardsEl.textContent = "Cards:";
    for (let i = 0; i < cards.length; i++) {
      cardsEl.textContent += cards[i] + " ";
    }
    sum += newCard;
    cards.push(newCard);
    sumEl.textContent = "Sum:" + sum;
    play();
    messageEl.textContent = message;
  }
}

function stay() {
  if (dealerSum > sum) {
    playerLost();
  } else if (dealerSum == sum) {
    startGame();
  } else dealerSum < sum;
  playerWon();
}

function playerWon() {
  message = "You win!";
  chips = chips + 50;
  chipsEL.textContent = chips;
}

function playerLost() {
  message = "You lose!";
  chips = chips - 50;
  chipsEL.textContent = "Chips: " + chips;
}

function playerBlackjack() {
  message = "Blackjack!";
  chips = chips + 75;
  chipsEL.textContent = "Chips: " + chips;
}

function dealerBust() {
  message = "Dealer Bust!";
  chips = chips + 50;
  chipsEL.textContent = "Chips: " + chips;
}
