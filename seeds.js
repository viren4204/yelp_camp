var mongoose = require('mongoose');
var Campground = require('./models/campground');

var data = [
  {
    name: "Cloud's Rest",
    image:  "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80",
    description: "blah blah blah"
  },
  {
    name: "Canyan Floor",
    image:  "https://images.unsplash.com/photo-1545572695-789c1407474c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
    description: "blah blah blah"
  },
  {
    name: "Desert Mesa",
    image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    description: "blah blah blah"
  }
]

function seedDB(){
  //remove all campgrounds
  Campground.remove({}, function(err){
    if (err) {
      console.log(err);
    } console.log("removed campground!");
    //add few campgroundSchema
  data.forEach(function(seed){
    Campground.create(seed,function(err, data){
      if(err){
        console.log(err);
      } else {
        console.log("added a campground");
      }
    });
  });

  });
  //add a few comments
}

module.exports = seedDB;
