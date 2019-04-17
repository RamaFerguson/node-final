const axios = require('axios');

const exchange = axios.create({
    baseURL: 'https://api.exchangeratesapi.io/latest'
});

const restcountries = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/name/'
});

//function to find exchange rate of base currency based on currency code
const getBaseExchange = (country) => {
    return new Promise((resolve, reject) => {
        console.log(country);
        const currencyCode = restcountries.get(country + '?fullText=true')
            .then((body) => {
                console.log(Object.keys(body.data[0].currencies[0].code[0]));
                // console.log(Object.keys(body.status));
            })
            .catch((error) => {
                console.log(error);
            })
        if (currencyCode) {
            resolve(currencyCode);
        }
        // if (currency) {
        //     resolve(currency);
        // } else {
        //     reject(`Unable to find currency with code ${currencyCode}`);
        // }
    });
};
// const country = document.getElementById("country").value;
// const amount = document.getElementById("amount").value;\
// document.getElementById("final").innerHTML = '$' + country + amount;

module.exports = {
    getBaseExchange
}