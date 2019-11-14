const express = require('express');
const http = require('http');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.use('/static', express.static('public'));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

module.exports = router;
