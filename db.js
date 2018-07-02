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
    return db.oneOrNone( "SELECT json FROM characters_comics WHERE url = '$1#'", [comicURL]); 
}

function getCollection(user_id){
    console.log("running get collection function");
    return db.any("SELECT collectors_comic_id, collectors_comic_title FROM comics_collection2 WHERE user_id ILIKE '%$1#%' ", [user_id]);
}

function getComicsCollection(user_id){
    console.log("running get collection function");
    return db.any("SELECT * FROM comics_collection WHERE user_id = $1 ", [user_id]);
}

function getCharactersCollection(user_id){
    console.log("running get collection function");
    return db.any("SELECT * FROM characters_collection WHERE user_id = $1", [user_id]);
}

function getCollectionAll(){
    console.log("running get collection all function");
    return db.any('SELECT * FROM comics_collection' );
}

function saveComic(id, title, description, image, characters){
    console.log("saving comic..")
    return db.one("INSERT into comics (comic_id, title, description, image, characters) VALUES ('$1#', '$2#', '$3#', '$4#', '$5#')", [id, title, description, image, characters]);
} 

function saveComicToUserCollection(user_id, comic_id, title, collectors_image){
    console.log("saving comic to users collection ..")
    return db.one("INSERT into comics_collection (user_id, comic_id, title, collectors_image) VALUES ('$1#', '$2#', '$3#', '$4#')", [user_id, comic_id, title, collectors_image]);
}

function saveCharacter(character_id, name, description, image){
    console.log("saving character..")
    return db.one("INSERT into characters (character_id, name, description, image) VALUES ('$1#', '$2#', '$3#', '$4#')", 
    [character_id, name, description, image]);
} 

function saveCharacterToUserCollection(user_id, character_id, character_name, character_image){
    console.log("saving comic to users collection ..")
    return db.one("INSERT into characters_collection (user_id, character_id, character_name, character_image) VALUES ('$1#', '$2#', '$3#', '$4#')", [user_id, character_id, character_name, character_image]);
}

function addJsonData(comicsURL,dataString) {
    console.log('adding api data to DB');
    return db.one('INSERT into characters_comics (url, json) VALUES ($1, $2)', [comicsURL, dataString]);
}

function getUser(user_id) {
    console.log(`Checking DB for user ${user_id}`);
    return db.oneOrNone('SELECT user_id FROM customer WHERE user_id = $1', [user_id]);
}

function getUserInfo(user_id) {
    return db.oneOrNone('SELECT * FROM customer WHERE user_id = $1', [user_id]);
}

function addNewUser(display_name,name,image, user_id) {
    console.log('User not found in DB, creating new user');
    return db.one('INSERT INTO customer (display_name, name, image, user_id) VALUES ($1, $2, $3, $4)', [display_name, name, image, user_id]);
}

function getAllUsers() {
    return db.any('SELECT * FROM customer')
}

function checkForComicInCollection(user_id, comic_id) {
    return db.oneOrNone("SELECT * FROM comics_collection WHERE user_id = $1 AND comic_id = $2;", [user_id, comic_id])
}

function checkForCharacterInCollection(user_id, character_id) {
    return db.oneOrNone("SELECT * FROM characters_collection WHERE user_id = $1 AND character_id = $2;", [user_id, character_id])
}

module.exports = {
    getJsonData,
    getComicsCollection,
    getCharactersCollection,
    getCollectionAll,
    getJsonData,
    addJsonData,
    saveComic,
    getUser,
    getAllUsers,
    saveCharacterToUserCollection,
    saveComicToUserCollection,
    saveCharacter,
    addNewUser,
    getCollection,
    checkForComicInCollection,
    checkForCharacterInCollection,
    getUserInfo
}; 

