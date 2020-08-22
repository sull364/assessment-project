const db = require("./models-sql.js");
const models = require("./modelsmongo.js");
const modelsSQL = require("./models-sql.js");


const fileController = {};

fileController.verifyUser = (req, res, next) => {
  // console.log("req.body: ", req.body)
  // console.log("req.query: ", req.query)
  // console.log("req.params: ", req.params)
  const { email, password } = req.body;
  // console.log("email: ", email);
  // console.log("password: ", password);

  const queryString = `SELECT * FROM USERS WHERE email=$1`;
  const queryValues = [email]

  db.query(queryString, queryValues)
    .then(data => {
      // console.log('data.rows: ', data.rows);
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
  // console.log('last line of verifyUser')
};


fileController.createItem = (req, res, next) => {
  // console.log("req.cookie: ", req.cookies)
  // console.log("req.body: ", req.body)
  // console.log("req.query: ", req.query)
  // console.log("req.params: ", req.params)
  const { title } = req.body;
  const { email } = req.cookies;

  // ============== SQL DATABASE ============== //
  const queryString = `INSERT INTO lists (title, completed, email) VALUES ($1, $2, $3) RETURNING title`;
  const queryValues = [title, false, email];

  db.query(queryString, queryValues)
    .then(data => {
      console.log('data.rows: ', data.rows[0]);
      console.log('last line of .then for createItem HIT ME')
      res.locals.item = data.rows[0] // this doesn't go anywhere
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

fileController.getItems = (req, res, next) => {
  const queryString2 = `SELECT * FROM lists`;
  db.query(queryString2)
    .then(data => {
      // console.log('====> fileController.getItems, data.rows should be an array of objects: ', data.rows)
      res.locals.items = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: `An error occurred while getting all list items: ${err}`,
        message: { err: "An error occurred in fileController.getItems" },
      });
    })
}

fileController.deleteItem = (req, res, next) => {
  // console.log('first line in deleteItem HIT ME')
  const { title } = req.body;
  // console.log('req.body: ', req.body);
  // console.log('req.body.title: ', title);
  const queryString = `DELETE FROM lists WHERE title=$1;`;
  const queryValues = [title]
  db.query(queryString, queryValues)
    .then(data => {
      console.log('====> fileController.deleteItem');
      return next();
    })
    .catch(err => {
      return next({
        log: `An error occurred while getting deleting list item: ${err}`,
        message: { err: "An error occurred in fileController.deleteItem" },
      });
    })
}

// fileController.updateItem = (req, res, next) => {
//   console.log('first line in update Item HIT ME')
//   const { title } = req.body;
//   console.log('req.body: ', req.body);
//   console.log('req.body.title: ', title);
//   const queryString = `UPDATE lists SET title=$1;`;
//   const queryValues = [title]
//   db.query(queryString, queryValues)
//     .then(data => {
//       console.log('====> fileController.updateItem');
//       return next();
//     })
//     .catch(err => {
//       return next({
//         log: `An error occurred while getting updating list item: ${err}`,
//         message: { err: "An error occurred in fileController.updateItem" },
//       });
//     })
// }





module.exports = fileController;