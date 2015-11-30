const port = process.env.PORT || 8080;

var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');

app.get('/read-only', function (req, res) {
  fs.readFile('./test/data.json', 'utf-8', function (err, data) {
    if (err) res.sendStatus(500);
    res.json(JSON.parse(data));
  });
});

app.get('/read-only/participants', function (req, res) {
  fs.readFile('./test/data.json', 'utf-8', function (err, data) {
    if (err) res.sendStatus(500);
    var participants = [];
    data = JSON.parse(data);
    data.instructors.forEach(v => participants.push(v.name));
    data.students.forEach(v => participants.push(v.name));
    res.json({'participants':participants});
  });
});

app.get('/read-only/search/:name', function (req, res) {
  fs.readFile('./test/data.json', 'utf-8', function (err, data) {
    if (err) res.sendStatus(500);
    data = JSON.parse(data);
    data.instructors = data.instructors.filter(v => v.name === req.params.name);
    data.students = data.students.filter(v => v.name === req.params.name);
    res.json(data)
  });

});

app.get('/read-only/sorted', function (req, res) {
  fs.readFile('./assets/data.json', 'utf-8', function (err, data) {
    if (err) res.sendStatus(500);
    data = JSON.parse(data);
    data.instructors = _.sortBy(data.instructors, v => v.name);
    data.students = _.sortBy(data.students, v => v.name);
    res.send(data);
  });
});

app.get('/read-only/show', function (req, res) {
  fs.readFile('./test/data.json', 'utf-8', function (err, data) {
    if (err) res.sendStatus(500);
    data = JSON.parse(data);
    var fields = req.query.field.split(',');
    console.log(fields);
    data.instructors = data.instructors.map(v => fields.reduce((a, f) => {
      a[f] = v[f];
      return a;
    }, {}));
    data.students = data.students.map(v => fields.reduce((a, f) => {
      a[f] = v[f];
      return a;
    }, {}));
    res.json(data);
  });
});

var highScore = {};

app.get('/CRUD', function (req, res) {
  res.json(highScore);
});

app.post('/CRUD/:name/:score', function (req, res) {
  highScore[req.params.name] = req.params.score;
  res.json(highScore);
});

app.put('/CRUD/:name/:score', function (req, res) {
  if (highScore[req.params.name]) {
    highScore[req.params.name] = req.params.score;
  }
  res.json(highScore);
});

app.delete('/CRUD/:name', function (req, res) {
  delete highScore[req.params.name];
  res.json(highScore);
});

app.listen(port);
module.exports = app;
