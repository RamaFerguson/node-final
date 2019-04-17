const yargs = require('yargs');
const coindesk = require('./coindesk');
const blockchain = require('./blockchain');
const currency = require('./currency');

const argv = yargs
    .options({
        country: {
            demand: true,
            alias: 'c',
            describe: 'Full name of country',
            string: true
        }
    })
    .help()
    .argv;


const main = async (country) => {
    //Requests a country from the user and gets a currency code from an api
    const code = await currency.getCurrencyCode(country);

    //Gets bitcoin conversion rate from coindesk
    const coinApi = await coindesk.getCoinDesk(code);

    //Gets bitcoin conversion rate from blockchain.info
    const exchangeApi = await blockchain.getBlockChain(code);
    
    console.log(`Currency of ${country}: ${code}`);
    console.log(`Coindesk rate: 1 ${code} = ${Number((coinApi).toFixed(2))} BTC`);
    console.log(`Blockchain.info rate: 1 ${code} = ${Number((exchangeApi).toFixed(2))} BTC`);
    if (coinApi < exchangeApi) {
        console.log('Coindesk has the best rate');
    } else if (coinApi > exchangeApi) {
        console.log('Blockchain.info has the best rate');
    } else {
        console.log('Both exchanges have the same rate');
    }
};

main(argv.country)
.catch((error) => {
    console.log(error.message);
});