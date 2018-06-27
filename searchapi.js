const md5 = require('md5');
const rp = require('request-promise');
const apiURL = 'http://gateway.marvel.com/v1/public/';
const apiKey = process.env.API_KEY;
const publicKey = process.env.PUBLIC_KEY;

function searchComicsByCharName(character) {
    let charQuery = character
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + `characters?name=${charQuery}&orderBy=name&` + apiAuthenticationString
    console.log(requestURL)
    return rp(requestURL)
        .then((data) => {
            let character = JSON.parse(data);
            let charID = character.data.results[0].id;
            let comicData = searchComicsByCharID(charID);
            // console.log(comicData);
            return comicData
            })
        .catch(error => {
            let message = 'character not found';
            return message
        })
}
function searchComicsByCharID(charID) {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + `characters/${charID}/comics?orderBy=title&limit=5&` + apiAuthenticationString
    console.log(requestURL)
    return rp(requestURL)
        .then((data) => {
            let comics = JSON.parse(data);
            return comics.data.results;
        })
}

module.exports = {
    searchComicsByCharID,
    searchComicsByCharName
}