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

/*
function saveComic(){
  console.log("saving comic..")
  return db.one("INSERT into comics_collection2 (collectors)")  
  return db.one("insert into Todos (title, isdone) values ('$1#', false ) returning id", [title]); 

} */
  

function addJsonData(comicsURL,dataString) {
    return db.one("insert into characters_comics (url, json) values ('$1#', '$2#')", [comicsURL, dataString]);
}
 
module.exports = {
    getJsonData ,
    getCollection,
    getCollectionAll,
    getJsonData,
    addJsonData
}; 

