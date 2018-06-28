const pgp = require('pg-promise')();

const {
    searchComicsByCharID,
    searchComicsByCharName,
    searchAllComics,
    searchAllCharacters
} = require('./searchapi');

const cn = {
    host : 'localhost',
    port : 5432, 
    database: 'marvelComicsApp',
    user: 'postgres',
    password: ''
}; 

const db = pgp(cn);

function getJsonData(comicURL) {
    console.log("running getjson function");
    return db.oneOrNone( "SELECT json FROM characters_comics WHERE url = '$1#'", [comicURL]) ; 
}

/*
getJsonData('http://gateway.marvel.com/v1/public/characters/1011256/comics?hasDigitalIssue=true&orderBy=title&limit=10')
 .then((data) => {console.log(data); })
 .catch((error) => {console.log(error) ; });
 */


module.exports = {
    getJsonData
}; 