const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Mustache = require('mustache');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';


const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, users) {
      // console.log(users[1]);
    res.render('users', {robots: users});
    });
  });
});

app.get('/available', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
  const robots = db.collection('robots');
  robots.find({job: null}).toArray(function (err, users) {
    console.log(users[0]);
  res.render('users', {robots: users});
    });
  });
});

app.get('/working', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
  const robots = db.collection('robots');
  robots.find({job: {$exists: true, $ne: null}}).toArray(function (err, users) {
    console.log(users[0]);
  res.render('users', {robots: users});
    });
  });
});

app.listen(3000, function () {
  console.log('Successfully started express application!');
});
