const express = require('express');
const http = require('http');
var postal = require('./postal.js');
var app = express();
var router = express.Router();

const connectionString = process.env.DATABASE_URL || 'postgres://tgmglealevxjcg:1f08f8bdfbc5df992db19261f057995cd20faa1e22b97d78a4ae6277181f0ece@ec2-174-129-253-42.compute-1.amazonaws.com:5432/d7a26gu20qhnoi?ssl=true';
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const {google} = require('googleapis');
const tasks = google.tasks('v1');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NoduleExpress' });
});

router.post('/getData', function (req, res) {
  var email= req.body.email;
  var sql = "SELECT * FROM users WHERE email = '" + email + "'";
  console.log("Using connection string: " + connectionString);
  console.log("Query: " + sql);
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
