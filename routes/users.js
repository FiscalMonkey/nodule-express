var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var db = require('./db.js');
var bodyParser = require('body-parser');
express().use(bodyParser.json());

const saltRounds = 10;


function addUser (req, res) {
  console.log(`Received add user request`);
  var email = req.body.email;
  var password = req.body.password;
  console.log(`email: ${email}, password: ${password}`);

  var hash = bcrypt.hashSync(password, saltRounds);
  console.log(`hash: ${hash}`);

  db.addUser(email, hash);
}

function login (req, res) {
  console.log(`Recieved login request`);
  var email = req.body.email;
  var password = req.body.password;

  db.login(email, function (hash) {
    console.log('comparing hashes...');
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(`correct password = ${res}`);
      //return res;
    });
  });
}

function email(req, res) {
  console.log(`Received email validation request`);
  var email = req.query.email;
  console.log(`received email: ${email}`);
  db.email(email, function (num) {
    if (num == 0) {
      console.log(`valid email`);
      return true;
    } else {
      console.log(`repeat email`);
      return false;
    }
  })
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = { 
  addUser : addUser,
  login : login,
  email : email
};
