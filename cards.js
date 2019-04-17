//function to get deck of N cards using API

const axios = require('axios');

const cardAPI = axios.create({
    baseURL: 'https://deckofcardsapi.com/api/deck/new/draw'
});

const getDeck = (async (number) => {
    try {
        console.log(number);
        // let newDeck = await axios.get('https://deckofcardsapi.com/api/deck/new/');
        // console.log(newDeck);
        // let newDeckID = newDeck.deck_id;
        let deckOfNumberCards = await axios.get('?count=' + number);
        console.log(deckOfNumberCards);
    } catch (err) {
        console.log(err)
        throw err
    }

    return;

});

module.exports = {
    getDeck
}