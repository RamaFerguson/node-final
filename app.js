const cards = require('./cards');
const nasa = require('./nasa');

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

app.get("/searchNASA", async (request, response) => {
    try {
        console.log(request.query.query)
        let keyword = request.query.query;
        let imageGallery = await nasa.getGallery(keyword);
        let imageObjectArray = imageGallery.data.collection.items;

        let imageURLArray = [];
        for (let imageObject of imageObjectArray) {
            imageURLArray.push(imageObject.links[0].href);
        }

        response.render("nasa.hbs", {
            images: imageURLArray,
            keyword: keyword
        });
        console.log(imageURLArray);
    }
    catch(err) {
        response.render("error.hbs", {

        });
    }
});

app.get("/searchCards", async (request, response) => {
    try {
        let number = request.query.number;
        let deck = await cards.getDeck(number);
    //     let imageObjectArray = imageGallery.data.collection.items;

    //     let imageURLArray = [];
    //     for (let imageObject of imageObjectArray) {
    //         imageURLArray.push(imageObject.links[0].href);
    //     }

    //     response.render("nasa.hbs", {
    //         images: imageURLArray,
    //         keyword: keyword
    //     });
    //     console.log(imageURLArray);
    }
    catch(err) {
        response.render("error.hbs", {

        });
    }
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))