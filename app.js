const express = require("express");
const hbs = require('hbs');
const axios = require('axios');
var request = require('request');
var app = express();
var bodyParser = require("body-parser");
hbs.registerPartials(__dirname + '/views/partials');
var mongo = require('mongodb');

const port = process.env.PORT || 8000;


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/tour-ward";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("tour-ward");
//   dbo.createCollection("Users", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("tour-ward");
//   dbo.createCollection("Volunteer", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('home.hbs');
});

app.get('/profile', (req, res) => {
	res.render('profile.hbs');
});

app.get('/places', (req, res) => {
	res.render('profile.hbs');
});

app.get('/explore', (req,res) =>{

	res.render('explore.hbs');
})

app.post('/explore', (req, res) => {
	var oldlocation = JSON.stringify(req.body.location);
	var location = oldlocation.replace(/['"]+/g, '');
	console.log(location);

	var encodedAddress = encodeURIComponent(req.body.location);
	var geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=D2seL6d8VWI8O4cYGqlrFLiCzpqaG6bZ&location=${encodedAddress}`;
	
	axios.get(geocodeURL).then((response) => { //first promise
		var lat = response.data.results[0].locations[0].latLng.lat;
		var lng = response.data.results[0].locations[0].latLng.lng;
		var country = response.data.results[0].locations[0].adminArea1;
		console.log(lat);
		console.log(lng);

		var tripAdvisor = `http://api.tripadvisor.com/api/partner/2.0/map/${lat},${lng}/attractions?key=03367A639FC54369B6E1482C58EC23AF`;
		
		return axios.get(tripAdvisor);
	
	})
	.then((resp) => {
		//console.log(JSON.parse(resp.data));
		console.log(resp.data.data[0]);
		res.render('explore.hbs', {
			stores: resp.data.data

		})

});
});


app.get('/local', (req, res) => {
	res.render('local.hbs');
});

app.get('/places', (req, res) => {
	res.render('places.hbs');
});

app.get('/localuser', (req, res) => {
	res.render('localuser.hbs');
});

app.get('/aboutus', (req, res) => {
	res.render('aboutus.hbs');
});



app.listen(process.env.PORT || 8000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});