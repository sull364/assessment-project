const { Pool } = require('pg');
const PG_URI = 'postgres://ligcoylc:Kz8pL4vhJ3E7WHu_jwtHxSLdJUT19Sbg@lallah.db.elephantsql.com:5432/ligcoylc';
//new instance of the pool
const pool = new Pool({
  connectionString: PG_URI,
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
