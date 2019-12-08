const users = require('./users.js');

const connectionString = process.env.DATABASE_URL || 'postgres://tgmglealevxjcg:1f08f8bdfbc5df992db19261f057995cd20faa1e22b97d78a4ae6277181f0ece@ec2-174-129-253-42.compute-1.amazonaws.com:5432/d7a26gu20qhnoi';
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString, ssl: true,});
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
console.log(`DB connectionString: ${connectionString}`);
pool.connect();

function addUser (email, hash) {
   console.log(`querying database for insertion`);
   var query = 'INSERT INTO users (email, hash) VALUES ($1, $2)';
   var values = [email, hash];
   pool.query(query, values, (err, res) => {
      if (err) {
         console.log(err.stack)
         return err.stack;
      } else {
         console.log(res.rows[0]);
         console.log(`SUCCESS: user added`)
      }
   });
}

function login (email, callback) {
   console.log(`querying database with email`);
   var query = 'SELECT hash FROM users WHERE email = $1';
   var values = [email]
   pool.query(query, values, (err, res) => {
      if (err) {
         console.log(`ERROR: ${err}`);
         return err.stack;
      }
      //if (res == true)
      var hash = JSON.stringify(res.rows[0]["hash"]).replace(/\"/g, "");
      console.log(`received hash from db`);
      callback(hash);
   });
}

module.exports = { 
   addUser : addUser,
   login : login
 };