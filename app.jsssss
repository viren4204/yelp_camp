var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDB = require("./seeds");
var comment = require('./models/comment');

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
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
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
  res.render('campgrounds/new');
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
        res.render("campgrounds/show", {campground: foundCampground});
    }
  })

});

//====================================
//COMMENTS ROUTES
//====================================
app.get("/campgrounds/:id/comments/new", function(req, res){
  //find campground by Id
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  })
});

app.post("/campgrounds/:id/comments", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campgound.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      })
    }
  });
});


app.listen(3000, function(){
  console.log('yelpCamp server has started');
});
