const express = require("express");
const hbs = require('hbs');
const axios = require('axios');
var request = require('request');
var app = express();
var bodyParser = require("body-parser");
hbs.registerPartials(__dirname + '/views/partials');

const port = process.env.PORT || 8000;



app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('home.hbs');
});

app.listen(process.env.PORT || 8000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});