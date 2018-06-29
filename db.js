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

function saveComic(){
  console.log("saving comic..")
  return db.one("INSERT into comics_collection2 (collectors)")  
  return db.one("insert into Todos (title, isdone) values ('$1#', false ) returning id", [title]); 

}
  

/*
getJsonData('http://gateway.marvel.com/v1/public/characters/1011256/comics?hasDigitalIssue=true&orderBy=title&limit=10')
 .then((data) => {console.log(data); })
 .catch((error) => {console.log(error) ; });
 */
/*
 getCollection('skphoopa@gmail.com')
 .then((data) => {console.log(data); })
 .catch((error) => {console.log(error) ; });
*/
 
module.exports = {
    getJsonData ,
    getCollection,
    getCollectionAll
};  