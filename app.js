var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds = [
  {name: "Salmon Creek", image:"https://cdn.pixabay.com/photo/2019/07/25/17/09/camp-4363073__340.png"},
  {name: "Granite Hill", image:"https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587__340.jpg"},
  {name: "Mountain Goat's Host", image:"https://cdn.pixabay.com/photo/2016/11/08/05/03/adventure-1807495__340.jpg"}
]

app.get('/', function(req, res){
  res.render('landing');
});

app.get('/campgrounds', function(req, res){


  res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render('new');
});

app.listen(3000, function(){
  console.log('yelpCamp server has started');
});
