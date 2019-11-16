const express = require('express');
const http = require('http');
var postal = require('./postal.js');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NoduleExpress' });
});
// Get post rate page
router.post('/post_rate', postal.calculateRate);

module.exports = router;
