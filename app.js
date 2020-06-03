var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDB = require("./seeds")

mongoose.connect('mongodb://localhost/yelp_camp_01');
app.use(bodyParser.urlencoded({extended: true}));
seedDB();


app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('landing');
});

//INDEX- Show all campgrunds
app.get('/campgrounds', function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render('index', {campgrounds: allCampgrounds});
    }
  });


});

//CREATE - Add new campgrounds to DB
app.post('/campgrounds', function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  //Create a new campground and save it to db
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//NEW - Show form to create new campgrounds
app.get("/campgrounds/new", function(req, res){
  res.render('new');
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
        res.render("show", {campground: foundCampground});
    }
  })

});

app.listen(3000, function(){
  console.log('yelpCamp server has started');
});
