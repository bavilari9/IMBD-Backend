const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
const cors = require('cors');
const Auth = require('./services/auth')
const logger = require('morgan');
var cookieParser = require('cookie-parser')

// views engine 
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// body parser 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// logger to see whats going on
app.use(logger('dev'));

// app.use('/', (req,res, next) => {
//     console.log("test", req.cookies);
    
//     next();
// });
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.set('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


// before all routes, use the middleware we define in Auth to get the
// current user, or i can put it directy when requiring the controller 
app.use(Auth.authenticate);
// routes for log in and log out 
// set up base routes
app.use('/users', require('./api/controllers/User'));
app.use('/profile', require('./api/controllers/Profile'));
app.use('/search', require('./api/controllers/Search'));
app.use('/email', require('./api/controllers/Email'));
app.use('/codes', require('./api/controllers/Codes'))
app.use('/login', require('./api/controllers/sessions'));


app.listen(PORT, ()=> console.log('Server listening on port ❤ 💩', PORT))

