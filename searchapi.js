const md5 = require('md5');
const rp = require('request-promise');
const apiURL = 'https://gateway.marvel.com/v1/public/';
const apiKey = process.env.API_KEY;
const publicKey = process.env.PUBLIC_KEY;
const {  
        getJsonData,
        getCollection, 
        addJsonData 
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
    let comicURL = apiURL + `characters/${charID}/comics?offset=&orderBy=title&limit=10`;
    let databaseJson =  getJsonData(comicURL);

    return databaseJson
        .then((data) => {
            console.log('Data via DB....');
            // console.log(data.json);
            let newData = data.json;
            // console.log(newData);
            let parsedData = JSON.parse(newData);
            // console.log(parsedData.data);
            return parsedData.data
           })
        .catch(error => {
            let message = 'character not found';
            return message
           })
}

function searchDatabaseURL(comicURL) {
    let databaseJson = getJsonData(comicURL);

    return databaseJson
        .then((data) => {
            console.log('Data via DB....');
            // console.log(data.json);
            let newData = data.json;
            // console.log(newData);
            let parsedData = JSON.parse(newData);
            // console.log(parsedData.data);
            return parsedData.data
        })
        .catch(error => {
            let message = 'character not found';
            return message
        })
}


function searchComicsByCharID(charID, comicURL) {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    // let comicURL = apiURL + `characters/${charID}/comics?offset=&orderBy=title&limit=10&`;
    let requestURL = comicURL + '&' + apiAuthenticationString
    console.log(requestURL)
    return rp(requestURL)
         .then((data) => {
            //send data to db BEFORE json.parse...
            addJsonData(comicURL, data)
                .then(() => {
                    console.log('added data to DB');
                    return
                })
                .catch((error) => {
                    return error.message
                })
            let comics = JSON.parse(data);
            console.log('data via API...');
            // console.log(comics.data);
            return comics.data;
        })
        .catch(error => {
            let message = 'character not found';
            return message
        }) 
}

function searchSpecificCharacter(id) {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + `characters/${id}?` + apiAuthenticationString;
    console.log(requestURL)
    return rp(requestURL)
        .then((data) => {
            let characterDetail = JSON.parse(data);
            characterDetail = characterDetail.data.results;
            // console.log(characterDetail);
            return characterDetail
        })
        .catch(error => {
            let message = '404';
            console.log(error.message);
            return message
        })
}

function searchSpecificComic(comicID) {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + `comics/${comicID}?` + apiAuthenticationString
    console.log(requestURL)
    return rp(requestURL)
        .then((data) => {
            let comicData = JSON.parse(data);
            console.log(comicData);
            return comicData.data.results
        })
        .catch((error) => {
            let message = 'Comic not found';
            return message
        })
}

function searchAllComics(comicURL) {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'comics?' + 'offset=&' + 'limit=&20' + apiAuthenticationString;
    console.log(requestURL);
    return rp(requestURL)
        .then((data) => {
            //send data to db BEFORE json.parse...
            addJsonData(comicURL, data)
                .then(() => {
                    console.log('added data to DB');
                    return
                })
                .catch((error) => {
                    console.log(error.message);
                    return error.message
                })
            let comics = JSON.parse(data);
            let results = comics.data;
            return results
            })
        .catch((error) => {
            let message = 'there was an error'
            return message
        })
    }
    
function searchAllComicsByOffset(comicURL, offset){
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'comics?' + `offset=${offset}` + '&limit=20&' + apiAuthenticationString;
    console.log(requestURL);
    return rp(requestURL)
        .then((data) => {
            //send data to db BEFORE json.parse...
            addJsonData(comicURL, data)
                .then(() => {
                    console.log('added data to DB');
                    return
                })
                .catch((error) => {
                    console.log(error.message);
                    return error.message
                })
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
    let requestURL = apiURL + 'characters?' + 'offset=&' + 'limit=20&' + apiAuthenticationString;
    console.log(requestURL);
    return rp(requestURL)
        .then((data) => {
            let characters = JSON.parse(data);
            let results = characters.data;
            return results
        })
        .catch((error) => {
            let message = 'there was an error';
            return message
        })
}

function searchAllCharactersByOffset(offset){
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'characters?' + `offset=${offset}` + '&limit=20&' + apiAuthenticationString;
    console.log(requestURL);
    return rp(requestURL)
          .then((data) => {
             let characters = JSON.parse(data);
             let results = characters.data;
             return results
    })
    .catch((error) => {
            let message = 'there was an error';
            return message
    })
    }

function searchCharacterByLetter(letter) {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'characters?' + `nameStartsWith=${letter}` + '&orderBy=name&' + 'limit=20&' + `offset=0&` + apiAuthenticationString;
    console.log(requestURL)
    return rp(requestURL)
        .then((data) => {
            let characters = JSON.parse(data);
            let results = characters.data;
            return results
        })
        .catch(error => {
            let message = '404';
            return message
        })
}

function searchCharacterByLetterAndOffset(letter, offset) {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'characters?' + `nameStartsWith=${letter}` + '&orderBy=name&' + 'limit=20&' + `offset=${offset}` + '&' + apiAuthenticationString;
    console.log(requestURL)
    return rp(requestURL)
        .then((data) => {
            let characters = JSON.parse(data);
            let results = characters.data;
            return results
        })
        .catch(error => {
            let message = '404';
            return message
        })
}

function searchComicsByLetter(letter) {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'comics?' + `titleStartsWith=${letter}` + '&orderBy=title&' + 'limit=20&' + `offset=0&` + apiAuthenticationString;
    console.log(requestURL)
    return rp(requestURL)
        .then((data) => {
            let comics = JSON.parse(data);
            let results = comics.data;
            return results
        })
        .catch(error => {
            let message = '404';
            console.log(error.message);
            return message
        })
}

function searchComicsByLetterAndOffset(letter, offset) {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'comics?' + `titleStartsWith=${letter}` + '&orderBy=title&' + 'limit=20&' + `offset=${offset}&` + apiAuthenticationString;
    console.log(requestURL)
    return rp(requestURL)
        .then((data) => {
            let comics = JSON.parse(data);
            let results = comics.data;
            return results
        })
        .catch(error => {
            let message = '404';
            console.log(error.message);
            return message
        })
}
module.exports = {
    searchComicsByCharID,
    searchComicsByCharName,
    searchAllComics,
    searchAllComicsByOffset,
    searchAllCharacters,
    searchAllCharactersByOffset,
    searchSpecificCharacter,
    searchSpecificComic,
    searchCharacterByLetter,
    searchCharacterByLetterAndOffset,
    searchComicsByLetter,
    searchComicsByLetterAndOffset,
    searchDatabase,
    searchDatabaseURL
}