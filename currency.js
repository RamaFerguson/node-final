//function to find currency code for provided country

const axios = require('axios');

const restcountries = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/name'
});

const getCurrencyCode = async (country) => {
    const currencyCode = await restcountries.get(country + '?fullText=true');
    if (typeof currencyCode === Error) {
        throw currencyCode;
    } else {
        return currencyCode.data[0].currencies[0].code;
    }
};

module.exports = {
    getCurrencyCode
}