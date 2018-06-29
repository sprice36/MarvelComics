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
    return db.oneOrNone( "SELECT json FROM characters_comics WHERE url = '$1#'", [comicURL]) ; 
}

function getCollection(userEmail){
  console.log("running get collection function");
  return db.any("SELECT collectors_comic_id, collectors_comic_title FROM comics_collection2 WHERE collectors_email ILIKE '%$1#%' ", [userEmail]);
 //return db.any('SELECT collectors_comic_id, collectors_comic_title FROM comics_collection2' );

}

function getCollectionAll(){
    console.log("running get collection all function");
   // return db.any("SELECT collectors_comic_id, collectors_comic_title FROM comics_collection2 WHERE collectors_email ILIKE '%$1#%' ", [userEmail]);
   return db.any('SELECT * FROM comics_collection2' );
  }

function saveComic(id, title, description, image, characters){
  console.log("saving comic..")
  return db.one("INSERT into comics (url_id, title, description, image, characters) VALUES ('$1#', '$2#', '$3#', '$4#', '$5#')", [id, title, description, image, characters]);
} 

function saveComicToUserCollection(){}

function addJsonData(comicsURL,dataString) {
    console.log('adding api data to DB');
    return db.one("insert into characters_comics (url, json) values ('$1#', '$2#')", [comicsURL, dataString]);
}
// function addNewUser(email)
 
module.exports = {
    getJsonData,
    getCollection,
    getCollectionAll,
    getJsonData,
    addJsonData,
    saveComic
}; 

