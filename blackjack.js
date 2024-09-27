// blackjack.js
let cardPlay =[9, 5];
let sumPlayer = cardPlay.reduce((sum, card) => sum + card, 0);
let cardBank = [7, 5];
let sumBanker = cardBank.reduce((sum, card) => sum + card, 0);


sumPlayer += 7;


if(sumPlayer === 21){
    console.log(sumPlayer); 
    console.log(sumBanker); 
    console.log("black win");
}
else if (sumPlayer<21){
    while(sumBanker<17){
        sumBanker += 6;
        if(sumPlayer>sumBanker || sumPlayer === 21){
            console.log(sumPlayer); 
            console.log(sumBanker); 
            console.log("you win");
        } else if (sumPlayer === sumBanker){
            console.log(sumPlayer); 
            console.log(sumBanker); 
            console.log("draw");
        } else if (sumPlayer<sumBanker && sumBanker === 21){
            console.log(sumPlayer);
            console.log(sumBanker); 
            console.log("bank win");
        }
    }
}
else{
    console.log(sumPlayer); 
    console.log(sumBanker); 
    console.log("you lose");
}

