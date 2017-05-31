var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var ejs = require('ejs');

var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
var router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/public', express.static(__dirname + '/public/'));
app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/javascripts', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/views', express.static(__dirname + '/views'));

//
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({ 
	secret: 'cookie-secret',
	name: 'cookie_name',
	proxy: true,
	resave: true,
	saveUninitialized: true
})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/*
app.get('/', function(req, res) {
	res.render('layouts/layout.html');
});
*/
require('./app/routes.js')(app, passport);

var server = app.listen(8000, function(){
	console.log('Express server listening in port: ' + server.address().port);
});