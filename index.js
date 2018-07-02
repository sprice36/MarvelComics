const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const static = express.static;
const rp = require('request-promise');
const apiURL = 'https://gateway.marvel.com/v1/public/';
const apiKey = process.env.API_KEY;
const publicKey = process.env.PUBLIC_KEY;
const md5 = require('md5');
const {
    searchComicsByCharID,
    searchComicsByCharName,
    searchAllComics,
    searchAllComicsByOffset,
    searchAllCharacters,
    searchSpecificCharacter,
    searchSpecificComic,
    searchCharacterByLetter,
    searchComicsByLetter,
    searchDatabase,
    searchDatabaseURL
} = require('./searchapi');
const { 
    getJsonData,
    addJsonData
} = require('./db');

const {
    getCollection, 
    getCollectionAll,
    getComicsCollection,
    getCharactersCollection,
} = require('./db');

const {
    saveComic,
    saveCharacter,
    saveCharacterToUserCollection,
    saveComicToUserCollection
} = require('./db');

const setupAuth = require('./auth');
const ensureAuthenticated = require('./auth').ensureAuthenticated;

const expressHbs = require('express-handlebars');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

const staticMiddleware = express.static('public');
app.use(staticMiddleware);

setupAuth(app);

app.get('/', (req, res) => {
    res.render('homepage', {
        layout: 'homepage',
        isLoggedIn: req.isAuthenticated()
    });
})


//search all characters
app.get('/characters', (req, res) => {
    let allCharacters = searchAllCharacters()
    allCharacters
        .then((allCharacters) => {
            if (allCharacters === 'there was an error') {
                res.send('ERROR')
            } else {
                // console.log(allComics);
                res.render('characters', {
                    allCharacters
                });
            }
        });
});

//search characters by starting letter
app.get('/characters/startswith/:id', (req, res) => {
    let allCharacters = searchCharacterByLetter(req.params.id)
    allCharacters
        .then((allCharacters) => {
            if (allCharacters === '404') {
                res.send('404')
            } else {
                // console.log(allComics);
                res.render('characters', {
                    allCharacters
                });
            }
        });
});

//goto characters specific details page
app.get('/characters/details/:id', (req, res) => {
    let characterDetail = searchSpecificCharacter(req.params.id)
    characterDetail
        .then((characterDetail) => {
            if (characterDetail === '404') {
                res.send('404')
            } else {
                // console.log(allComics);
                res.render('characterDetailPage', {
                    characterDetail
                });
            }
        });
});

app.post('/characters/details/:id', (req, res) =>{
    let id = req.params.id;
    let name = req.body.name; 
    let description = req.body.description;
    let image = req.body.image;
    let saveaCharacter = saveCharacter(id, name, description, image)
     saveaCharacter
     .then(  
       res.redirect(`/characters/details/${req.params.id}`)
    )
     .catch((error) =>{
         console.log(error.message);
     })

})

//search comics associated with certain character
app.get('/characters/details/:id/comics', (req, res) => {
    let comicURL = apiURL + `characters/${req.params.id}/comics?offset=&orderBy=title&limit=10`
    getJsonData(comicURL)
        .then((data) => {
            if (data) {
                console.log('found data in local DB');
                let comicData = searchDatabase(req.params.id);
                return comicData
            } else {
                console.log('did not find data, running API call')
                let comicData = searchComicsByCharID(req.params.id, comicURL);
                return comicData
            }
        // return comicData
        })
        .then((comicData) => {
                    if (comicData === 'character not found') {
                        console.log('not found');
                        res.send('character not found')
                    } else {
                        // console.log(comicData); 
                        console.log('njoy data');
                        res.render('characterInComics', {
                            comicData
                        })
                    }
        })
        .catch(error => {
            return res.send(error.message)
        })
})


app.get('/comics/startswith/:id', (req, res) => {
    let allComics = searchComicsByLetter(req.params.id)
    allComics
        .then((allComics) => {
            if (allComics === '404') {
                res.send('404')
            } else {
                // console.log(allComics);
                res.render('comics', {
                    allComics
                });
            }
        });
});

app.get('/comics', (req, res) => {
    let comicURL = apiURL + 'comics?' + `offset=&` + 'limit=20&';
    getJsonData(comicURL)
        .then((data) => {
            if (data) {
                console.log('found data in local DB');
                let allComics = searchDatabaseURL(comicURL);
                return allComics
            } else {
                console.log('did not find data, running API call')
                let allComics = searchAllComics(comicURL);
                return allComics
            }
            // return allComics
        })
        .then((allComics) => {
            if (allComics === 'there was an error') {
                res.send('ERROR')
            } else {
                res.render('comics', {
                    allComics
                });
            }
        })


});

app.get('/comics/page/:pageNumber', (req, res) => {
    let pageNumber = 1;
    let index = 20;
    let offset = pageNumber * index;
    let comicURL = apiURL + 'comics?' + `offset=${offset}&` + 'limit=20&';
    getJsonData(comicURL)
        .then((data) => {
            if (data) {
                console.log('found data in local DB');
                let allComics = searchDatabaseURL(comicURL);
                return allComics
            } else {
                console.log('did not find data, running API call')
                let allComics = searchAllComicsByOffset(comicURL, offset);
                return allComics
            }
            // return allComics
        })
        .then((allComics) => {
            if (allComics === 'there was an error') {
                res.send('ERROR')
            } else {
                res.render('comics', {
                    allComics
                });
            }
        })


});


app.get('/comics/details/:id', (req, res) => {
    let comicDetail = searchSpecificComic(req.params.id)
        comicDetail
          .then((comicDetail) => {
              if (comicDetail === 'there was an error') {
                  res.send('ERROR')
              } else {
                  res.render('comicsDetail', {
                      comicDetail
                  });
              }
          });
  });

app.post('/comics/details/:id', (req, res) =>{
    let id = req.params.id;
    let title = req.body.title; 
    let description = req.body.description;
    let image = req.body.image;
    let characters = req.body.characters;
    let saveaComic = saveComic(id, title, description, image, characters)
     saveaComic
     .then(  
       res.redirect(`/comics/details/${req.params.id}`)
    )
     .catch((error) =>{
         console.log(error.message);
     })

    

})

app.get('/collection', (req, res) => {
    let collection = getCollectionAll()
      collection
          .then((collection) => {
              if (collection === 'there was an error') {
                  res.send('ERROR')
              } else {
                  res.render('collection', {
                      collection
                  });
              }
          });
  });
  


//server initialization
app.listen(process.env.PORT, () => {
    console.log(`Your server is running at http://localhost:${process.env.PORT}`);
});

// Request Url: http://gateway.marvel.com/v1/public/comics
// Request Method: GET
// Params: {
//   "apikey": "your api key",
//   "ts": "a timestamp",
//   "hash": "your hash"
// }
// Headers: {
//   Accept: 
// }

