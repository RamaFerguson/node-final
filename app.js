
const coindesk = require('./coindesk');
const blockchain = require('./blockchain');
const currency = require('./currency');

// express setup
var express = require("express");
var hbs = require("hbs");
var port = process.env.PORT || 8080;

var app = express();

// enables parsing of body json
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

hbs.registerPartials(__dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.use(express.static("assets"));

app.get("/", (request, response) => {
    response.render("landing.hbs")
});

app.post("/sendData", async (request, response) => {
    try {
        let country = request.body.country;
        console.log(country);

        let text = await main(country);

        console.log(text);

        response.render("signup.hbs", {
            message1: text.message1,
            message2: text.message2,
            message3: text.message3,
            message4: text.message4
        });
        // response.redirect("/signup");
    }

    catch (err) {
        console.log(err)
    }

});

app.get("/signup", (request, response) => {
    response.render("signup.hbs", {
        title: "Sign Up"
    });
});


const main = async (country) => {
    //Requests a country from the user and gets a currency code from an api
    const code = await currency.getCurrencyCode(country);

    //Gets bitcoin conversion rate from coindesk
    const coinApi = await coindesk.getCoinDesk(code);

    //Gets bitcoin conversion rate from blockchain.info
    const exchangeApi = await blockchain.getBlockChain(code);

    let message1 = `Currency of ${country}: ${code}`;
    let message2 = `Coindesk rate: 1 ${code} = ${Number((coinApi).toFixed(2))} BTC`;
    let message3 = `Blockchain.info rate: 1 ${code} = ${Number((exchangeApi).toFixed(2))} BTC`;
    let message4;
    if (coinApi < exchangeApi) {
        message4 = 'Coindesk has the best rate';
    } else if (coinApi > exchangeApi) {
        message4 = 'Blockchain.info has the best rate';
    } else {
        message4 = 'Both exchanges have the same rate';
    }

    return {
        message1,
        message2,
        message3,
        message4
    }
};



app.listen(port, () => console.log(`Example app listening on port ${port}!`))