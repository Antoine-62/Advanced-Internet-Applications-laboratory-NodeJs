const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('express-flash-messages')
const app = express();
const routing = require('./routing')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid');

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash())//to use flash message
app.use(session({
    //we initialize sessions, and set it an id
    genid: (request) => {
        console.log('Inside the session middleware')
        console.log(request.sessionID)//we display this id on console, to check we have different users
        return uuidv4() // use UUIDs for session IDs
      },
      resave: false,
      saveUninitialized: true,
      'secret': '343ji43j4n3jn4jk3n'
}));

//To be able to retrieve data from forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client


app.set('views', __dirname + '/views');//say to our app where are our views
app.set('view engine', ejs);//we'll use ejs for our views

app.use('/',routing);// we attach the routing to our app


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});