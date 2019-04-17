//function to find image from NASA API

const axios = require('axios');

const nasaAPI = axios.create({
    baseURL: 'https://images-api.nasa.gov'
});

const getGallery = ( async (keyword) => {
    console.log('__getGallery__')
    console.log(keyword)
    let gallery;
    try {
        gallery = await nasaAPI.get('/search?q=' + keyword);

    }
    catch(err) {
        throw err
    }

    return gallery;

});

module.exports = {
    getGallery
}