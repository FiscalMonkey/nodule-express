const express = require('express');
const http = require('http');
var postal = require('./postal.js');
var users = require('./users.js');
const db = require('./db.js')
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NoduleExpress' });
});

router.post('/signup', users.addUser);
router.post('/login', users.login);

router.post('/getData', function (req, res) {
  var email= req.body.email;
  var sql = `SELECT * FROM users WHERE email = ${email}`;
  console.log("Using connection string: " + connectionString);
  console.log(`Query: ${sql}`);
  pool.query(sql, function (err, result) {

    // If an error occurred...
    if (err) {
      console.log("Error in query: ")
      console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    
    if (result.rows) {
      console.log(result.rows);
      res.json(result.rows);
    } else {
      console.log("No response");
    }
  }
)})
// Get post rate page
router.post('/post_rate', postal.calculateRate);

module.exports = router;
