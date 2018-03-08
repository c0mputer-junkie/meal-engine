var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var app = express();

// var logger = function (req, res, next){
//   console.log('Logging...');
//   next();
// }
// app.use(logger);

//view Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extende: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));

//Global Vars
app.use(function(req, res, next){
  res.locals.errors = null;
  next();
});

// Express validator middleware
app.use(expressValidator());

var users = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
  },
  {
    id: 2,
    first_name: 'Sara',
    last_name: 'Smith',
    email: 'ssmith@gmail.com',
  },
  {
    id: 3,
    first_name: 'Jo',
    last_name: 'Jackson',
    email: 'jjackson@gmail.com',
  }
]
app.get('/', function(req, res){
  db.users.find(function (err, docs) {
    res.render('index', {
      title: 'Customers',
      users: docs
    });
  });

});

app.post('/users/add', function(req, res){

req.checkBody('first_name', 'First Name is Required').notEmpty();
req.checkBody('last_name', 'Last Name is Required').notEmpty();
req.checkBody('email', 'Email Name is Required').notEmpty();

//validation
var errors = req.validationErrors();
if(errors){
  res.render('index', {
    title: 'Customers',
    users: users,
    errors: errors
  });
}else{
  var newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  }
  console.log('SUCCESS');
}
});

app.listen(3000, function(){
  console.log('Server Started on Port 3000...');
})
