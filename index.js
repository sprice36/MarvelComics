const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

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


//server initialization
app.listen(process.env.PORT, () => {
    console.log(`Your server is running at http://localhost:${process.env.PORT}`);
})