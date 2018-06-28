const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const static = express.static;
const rp = require('request-promise');
const apiURL = 'http://gateway.marvel.com/v1/public/';
const apiKey = process.env.API_KEY;
const publicKey = process.env.PUBLIC_KEY;
const md5 = require('md5');
const {
    searchComicsByCharID,
    searchComicsByCharName,
    searchAllComics,
    searchAllCharacters
} = require('./searchapi');

const setupAuth = require('./auth');
const ensureAuthenticated = require('./auth').ensureAuthenticated;

// const Todo = require('./db');

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

// setupAuth(app);


app.get('/homepage', (req, res) => {
    res.render('homepage');

//search comics associated with certain character
app.get('/characters/:id', (req, res) => {
    let comicData = searchComicsByCharID(req.params.id);
    comicData
        .then((comicData) => {
            if (comicData === 'character not found') {
                res.send('character not found')
            } else {
                res.render('singleCharacter', {comicData});
            }
        })

});

//search all comics
app.get('/comics', (req, res) => {

    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = '&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'comics/14038?' + apiAuthenticationString;
    // console.log(requestURL);

    rp(requestURL)
        .then((data)=> {
            let comics = JSON.parse(data);
            let results = comics.data.results[0];
            // console.log(comics);
            res.render('comics', {
                results
            });
        }).catch((error) => {
            res.send(error);
        }); 
    }
);

app.get('/characters', (req, res) => {
  
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey); 
    let apiAuthenticationString = 'ts=' + ts +  '&apikey=' + publicKey + '&hash=' + hash; 
    let requestURL = apiURL + 'characters?'  + 'limit=20&' + apiAuthenticationString;
    console.log(requestURL);

    rp(requestURL)
        .then((data)=> {
            let comics = JSON.parse(data);
            let results = comics.data.results;
              // console.log(results);
            res.render('characters', {
                results 
            });
        }).catch((error) => {
            res.send(error);
        }); 
    }  
);

app.get('/characters/:id', (req, res) => {
    let comicData = apiFunctions.searchComicsByCharName(req.params.id)
    comicData
        .then((comicData) => {
            if (comicData === 'character not found') {
                res.send('character not found')
            } else {
                console.log(comicData);
                res.render('singleCharacter', {comicData});
            }
        })
});



app.get('/library', (req, res) => {
  
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey); 
    let apiAuthenticationString = 'ts=' + ts +  '&apikey=' + publicKey + '&hash=' + hash; 
    let requestURL = apiURL + 'comics?'  + 'limit=20&' + apiAuthenticationString;
    console.log(requestURL);

    rp(requestURL)
        .then((data)=> {
            let comics = JSON.parse(data);
            let results = comics.data.results;
              // console.log(results);
            res.render('library', {
                results 
            });
        }).catch((error) => {
            res.send(error);
        }); 

    let allComics = searchAllComics()
    allComics
        .then((allComics) => {
            if (allComics === 'there was an error') {
                res.send('ERROR')
            } else {
                // console.log(allComics);
                res.render('comics', {
                    allComics
                });
            }
        });
});

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

    }  
);

app.get('/characterstartswith/:id', (req, res) => {
    let characters = searchAllCharacters()
    characters
        .then((characters) => {
            if (characters === 'there was an error') {
                res.send('ERROR')
            } else {
                // console.log(allComics);
                res.render('characters', {
                    characters
                });
            }
        });
    }  
);
app.get('/comicstartswith/:id', (req, res) => {
    let comics = searchAllComics()
    comics
        .then((comics) => {
            if (comics === 'there was an error') {
                res.send('ERROR')
            } else {
                // console.log(allComics);
                res.render('characters', {
                    comics
                });
            }
        });
    }  
);

//server initialization
app.listen(process.env.PORT, () => {
    console.log(`Your server is running at http://localhost:${process.env.PORT}`);
})

// Request Url: http://gateway.marvel.com/v1/public/comics
// Request Method: GET
// Params: {
//   "apikey": "your api key",
//   "ts": "a timestamp",
//   "hash": "your hash"
// }
// Headers: {
//   Accept: */*
// }
