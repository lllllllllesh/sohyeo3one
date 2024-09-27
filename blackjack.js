// blackjack.js
let cardOne =8;
let cardTwo = 6;
let sum = cardOne + cardTwo;
let cardOneBank = 5;
let cardTwoBank = 5;
let cardThreeBank = 6;
let cardFourBank = 4;
let cardThree = 7;
sum += cardThree;

if (sum > 21) {
 console.log('You lost');
}
console.log(`You have ${sum} points`);
let bankSum = cardOneBank + cardTwoBank + cardThreeBank + cardFourBank;

if (bankSum > 21 || (sum <= 21 && sum > bankSum)) {
    console.log('You win');
} else if (bankSum === sum && bankSum<21 && sum<21){
    console.log('Draw');
} else {
    console.log('Bank wins');
}


// 카드 패가 같을때의 조건이 없음