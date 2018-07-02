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

function getComicsCollection(username){
  console.log("running get collection function");
  return db.any("SELECT * FROM comics_collection WHERE collectors_email ILIKE '%$1#%' ", [username]);
 
}

function getCharactersCollection(username){
    console.log("running get collection function");
    return db.any("SELECT * FROM characters_collection WHERE collectors_email ILIKE '%$1#%' ", [username]);
  
  }

function getCollectionAll(){
    console.log("running get collection all function");
    return db.any('SELECT * FROM comics_collection' );
  }

function saveComic(id, title, description, image, characters){
  console.log("saving comic..")
  return db.one("INSERT into comics (comic_id, title, description, image, characters) VALUES ('$1#', '$2#', '$3#', '$4#', '$5#')", [id, title, description, image, characters]);
} 

function saveComicToUserCollection(username, collectors_email, comic_id, title, collectors_image){
    console.log("saving comic to users collection ..")
  return db.one("INSERT into comics_collection (username, collectors_email, comic_id, title, collectors_image) VALUES ('$1#', '$2#', '$3#', '$4#', '$5#')", [username, collectors_email, comic_id, title, collectors_image]);

}

function saveCharacter(character_id, name, description, image){
    console.log("saving character..")
    return db.one("INSERT into characters (character_id, name, description, image) VALUES ('$1#', '$2#', '$3#', '$4#')", 
    [character_id, name, description, image]);
} 

function saveCharacterToUserCollection(username, collectors_email, character_id, name, character_image){
    console.log("saving comic to users collection ..")
  return db.one("INSERT into characters_collection (username, collectors_email, character_id, name, character_image) VALUES ('$1#', '$2#', '$3#', '$4#', '$5#')", [username, collectors_email, character_id, name, character_image]);

}

function addJsonData(comicsURL,dataString) {
    console.log('adding api data to DB');
    return db.one("insert into characters_comics (url, json) values ('$1#', '$2#')", [comicsURL, dataString]);
}

function addNewUser(username, firstname, email){
    console.log('adding user')
    return db.one("INSERT into customer (username, firstname, email) VALUES ('$1#', '$2#' ,'$3#')" [username, firstname, email]);
}



module.exports = {
    getJsonData,
    getComicsCollection,
    getCharactersCollection,
    getCollectionAll,
    getJsonData,
    addJsonData,
    saveComic,
    saveCharacterToUserCollection,
    saveComicToUserCollection,
    saveCharacter,
    addNewUser
}; 

