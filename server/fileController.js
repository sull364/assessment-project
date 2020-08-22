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
        console.log('second line of try block HIT ME')
        next();
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
}

//res.locals.userlist


fileController.createUser = async (req, res, next) => {
  // ============== MONGO DATABASE ============== //
  try {
    const newUser = req.body;
    await models.Users.create(newUser)
      .then(data => {
        res.locals.user = data;
      })
      .catch(err => {
        console.log('fileController.createUser mongoo error: ', err);
      })
  } catch (err) {
    return next({
      log: `An error occurred while creating new user: ${err}`,
      message: { err: "An error occurred in fileController.createUser" },
    });
  }
}

module.exports = fileController;