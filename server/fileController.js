const db = require("./models-sql.js");
const models = require("./modelsmongo.js");
const modelsSQL = require("./models-sql.js");


const fileController = {};

fileController.verifyUser = (req, res, next) => {

  console.log("req.body: ", req.body)
  console.log("req.query: ", req.query)
  console.log("req.params: ", req.params)
  const { email, password } = req.body;
  console.log("email: ", email);
  console.log("password: ", password);


  // ============== MONGO DATABASE ============== //
  // models.Users.findOne({ email: email })
  //   .then(data => console.log('models.Users data: ', data))
  //   .catch(err => console.log('models.Users error: ', err))


  // ============== SQL DATABASE ============== //
  const queryString = `SELECT * FROM USERS WHERE email=$1`;
  const queryValues = [email]

  db.query(queryString, queryValues)
    .then(data => {
      console.log('data.rows: ', data.rows);
      if (data.rows[0].password == password) {
        res.cookie('email', email);
        console.log('second line of try block HIT ME')
        return next();
      } else {
        return res.send('Please enter correct password')
      }
    })
    .catch(err => {
      return next({
        log: `An error occurred while verifying user: ${err}`,
        message: { err: "An error occurred in fileController.verifyUser" },
      });
    })
  // ============== SQL DATABASE ============== //

  console.log('last line of verifyUser')
};


fileController.createItem = (req, res, next) => {
  console.log("req.cookie: ", req.cookies)
  console.log("req.body: ", req.body)
  console.log("req.query: ", req.query)
  console.log("req.params: ", req.params)
  const { title } = req.body;
  const { email } = req.cookies;

  // ============== SQL DATABASE ============== //
  const queryString = `INSERT INTO lists (title, completed, email) VALUES ($1, $2, $3) RETURNING title`;
  const queryValues = [title, false, email];

  db.query(queryString, queryValues)
    .then(data => {
      console.log('data.rows: ', data.rows);
      res.locals.item = data.rows[0].title;
      console.log('fileController.createItem res.locals.item: ', res.locals.item)
      console.log('last line of .then for createItem HIT ME')
      return next();
    })
    .catch(err => {
      return next({
        log: `An error occurred while creating list item: ${err}`,
        message: { err: "An error occurred in fileController.createItem" },
      });
    })
  // ============== SQL DATABASE ============== //

  console.log('last line of createItem')
}










module.exports = fileController;