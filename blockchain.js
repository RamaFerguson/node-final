//finds exchange rate from blockchain.info

const axios = require('axios');

const getBlockChain = async (currencyCode) => {
    const exchangeRate = await axios.get('https://blockchain.info/tobtc?value=1&currency=' + currencyCode);
    if (typeof exchangeRate === Error) {
        throw exchangeRate;
    } else {
        let exchange = 1/exchangeRate.data;
        return exchange;
    }
};

module.exports = {
    getBlockChain
}