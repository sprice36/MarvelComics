const md5 = require('md5');
const rp = require('request-promise');
const apiURL = 'http://gateway.marvel.com/v1/public/';
const apiKey = process.env.API_KEY;
const publicKey = process.env.PUBLIC_KEY;
const {  
        getJsonData 
} = require('./db')
function searchComicsByCharName(character) {
    let charQuery = character
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + `characters?name=${charQuery}&orderBy=name&` + apiAuthenticationString
   // console.log(requestURL)
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

function searchDatabase(charID){
    let comicURL =  apiURL + `characters/${charID}/comics?hasDigitalIssue=true&orderBy=title&limit=10` ; 
    let databaseJson =  getJsonData(comicURL);

    return databaseJson 
      .then ((data) => {
        console.log(data.json);
        console.log("thats the data");
        return JSON.parse(data.json);
    })
     .catch (error => {
        let message = 'character not in database';
        return message
    }) 
}


function searchComicsByCharID(charID) {
    // console.log('running now');
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + `characters/${charID}/comics?hasDigitalIssue=true&orderBy=title&limit=10&` + apiAuthenticationString
    console.log(requestURL)
    return rp(requestURL)
         .then((data) => {
            let comics = JSON.parse(data);
      //      console.log(comics.data);
            return comics.data;
        })
        .catch(error => {
            let message = 'character not found';
            return message
        }) 
}

function searchAllComics() {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'comics?' + 'offset=&' + 'limit=20&' + apiAuthenticationString;
    console.log(requestURL);
    return rp(requestURL)
        .then((data) => {
            let comics = JSON.parse(data);
            let results = comics.data;
            return results
            })
        .catch((error) => {
            let message = 'there was an error'
            return message
        })
    }
    
function searchAllCharacters() {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'characters?' + 'offset=450&' + 'limit=20&' + apiAuthenticationString;
    console.log(requestURL);
    return rp(requestURL)
        .then((data) => {
            let comics = JSON.parse(data);
            let results = comics.data;
            return results
        })
        .catch((error) => {
            let message = 'there was an error';
            return message
        })
}

module.exports = {
    searchComicsByCharID,
    searchComicsByCharName,
    searchAllComics,
    searchAllCharacters,
    searchDatabase
}