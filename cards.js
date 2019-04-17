//function to get deck of N cards using API

const axios = require('axios');

const getDeck = (async (number) => {

    try {
        console.log(number);
        let deckOfNumberCardsObject = await axios.get('https://deckofcardsapi.com/api/deck/new/draw?count=' + number);
        let deck = deckOfNumberCardsObject.data.cards;
        // console.log(deck);
        let deckArray = [];
        for (let card of deck) {
            deckArray.push(card);
        }
        // console.log(deckArray)
        return deckArray;

    } catch (err) {
        console.log(err)
        throw err
    }


});

module.exports = {
    getDeck
}