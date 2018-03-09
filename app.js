var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs')
var db = mongojs('meal-engine', ['users']);
var ObjectId = mongojs.ObjectId;
var app = express();

// var logger = function(req, res, next){
//   console.log('logging...');
//   next();
// }
//
// app.use(logger);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body Parser Middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

//Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

// Express Validator Middleware
app.use(expressValidator());﻿

app.get('/', function(req, res){
  db.users.find(function(err, users){
    res.render('index', {
      title: 'Customers',
      users: users
    });
  })
});

app.post('/users/add', function(req, res){
  req.checkBody('first_name', 'First Name is Required').notEmpty();
  req.checkBody('last_name', 'Last Name is Required').notEmpty();
  req.checkBody('email', 'Email Name is Required').notEmpty();

  var errors = req.validationErrors();

    if(errors){
      db.users.find(function(err, users){
        res.render('index', {
          title: 'Customers',
          errors: errors,
          users: users
        });
      })
    } else {
        var newUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
        }

          db.users.insert(newUser, function(err, result){
            if(err){
              console.log(err);
            }
            res.redirect("/");
          });
      }
});

app.delete('/users/delete/:id', function(req, res){
  db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
});

app.listen(3000, function(){
  console.log('Server Started on Port 3000...');
})
