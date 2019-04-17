const cards = require('./cards');
const nasa = require('./nasa');

// express setup
var express = require("express");
var hbs = require("hbs");
var port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
app.use(express.static("assets"));

app.get("/", (request, response) => {
    response.render("landing.hbs")
});

app.post("/", (request, response) => {
    response.render("landing.hbs")
});

app.get("/searchNASA", async (request, response) => {
    var imageURLArray = [];

    try {

        let keyword = request.query.q;
        let imageGallery = await nasa.getGallery(keyword);
        let imageObjectArray = imageGallery.data.collection.items;
        // console.log(imageObjectArray[0].links[0].href)
        
        for (var imageObject of imageObjectArray) {
            // console.log(imageObject.links[0].href)
            let link = imageObject.links[0].href;
            // console.log(link)
            
            imageURLArray.push(String(link));
            // console.log(imageURLArray)
        }
        console.log(imageURLArray);
        // console.log(images)

        response.render("nasa.hbs", {
            images: imageURLArray,
            keyword: keyword
        });
    }
    catch(err) {
        response.render("error.hbs", {

        });
    }
});

app.get("/searchCards", async (request, response) => {
    try {
        let number = request.query.number;
        let numberInt = parseInt(number);

        if (numberInt < 0 || numberInt > 52){
            throw error
        }

        let deckArray = await cards.getDeck(number);
        let cardImageArray = [];
        for (let card of deckArray){
            cardImageArray.push(card.image);
        }
  
        response.render("cards.hbs", {
            cards: cardImageArray,
            number: number
        });
    }
    catch(err) {
        console.log(err)
        response.render("error.hbs");
    }
});




app.listen(port, () => console.log(`My cool website listening on port ${port}!`))