var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var db = require('./db.js');

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
        res.send(err);
      }
      console.log(`correct password = ${res}`);
      //return res;
    });
  });
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = { 
  addUser : addUser,
  login : login
};
