var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp_01');
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

//schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//   name: "Salmon Creek",
//   image:"https://cdn.pixabay.com/photo/2019/07/25/17/09/camp-4363073__340.png",
//   description: "This is use salman creek and i don't know what it means."
// }, function(err, campground){
//   if (err) {
//       console.log(err);
//   } else {
//     console.log("NEWLY CREATED CAMPGROUND");
//     console.log(campground);
//   }
// });

// var campgrounds = [
//
//   // {name: "Granite Hill", image:"https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587__340.jpg"},
//   // {name: "Mountain Goat's Host", image:"https://cdn.pixabay.com/photo/2016/11/08/05/03/adventure-1807495__340.jpg"}
// ]

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
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
        res.render("show", {campground: foundCampground});
    }
  })

});

app.listen(3000, function(){
  console.log('yelpCamp server has started');
});
