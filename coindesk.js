//finds exchange rate from coindesk.com

const axios = require('axios');

const coindesk = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi/currentprice/'
});

const getCoinDesk = async (currencyCode) => {
    const exchangeRate = await coindesk.get(currencyCode + '.json');
    if (typeof exchangeRate === Error) {
        throw exchangeRate;
    } else {
        let exchange = exchangeRate.data.bpi[currencyCode].rate_float;
        return exchange;
    }
};

module.exports = {
    getCoinDesk
}