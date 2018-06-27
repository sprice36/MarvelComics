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

// app.get('/:character', (req, res) = {

// });

app.get('/comics', (req, res) => {
    // getMarvelResponse();
    // }
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let apiAuthenticationString = 'ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    let requestURL = apiURL + 'comics/14038?' + apiAuthenticationString;
    console.log(requestURL);

    rp(requestURL)
        .then((data)=> {
            let comics = JSON.parse(data);
            let results = comics.data.results[0]
            // console.log(comics);
            res.render('comics', {
                results
            });
        }).catch((error) => {
            res.send(error);
        }); 
    }
);

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

//server initialization
app.listen(process.env.PORT, () => {
    console.log(`Your server is running at http://localhost:${process.env.PORT}`);
})

function getMarvelResponse () {
    let ts = new Date().getTime();
    let hash = md5(ts + apiKey + publicKey);
    let searchType = 'comics/3750s'
    // let options = {
    //     uri: apiURL,
    //     apikey: publicKey,
    //     hash: hash
    // }
    let testURL = apiURL + 'comics/37502' + '?ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    console.log(testURL);
    rp(testURL)
        .then((data) => {
            console.log(data);
            // res.send(data);
        })
        .catch((error) => {
            console.log(error.message);
        })
}