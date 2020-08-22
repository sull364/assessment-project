const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./api.js');
const fileController = require("./fileController.js");

app.use(express.json());

// =============== DEFINE ROUTE HANDLERS =============== //
app.use('/api', apiRouter)


// app.get("/login", fileController.verifyUser, (req, res) => {
//   console.log('server.js /login hit');
//   return res.status(200).sendFile(path.resolve(__dirname, "../list.html"));
// })

// =============== SERVE UP MAIN APP =============== //
app.use(express.static(path.join(__dirname, '../'))); // auto serves any file named "index.html" but not any other html file
// app.get('/', (req, res) => {
//   return res.status(200).sendFile(path.resolve(__dirname, '../index.html')); // we specify which file to serve
// })
app.get('/', (req, res) => {
  return res.status(200).redirect("/api"); // we specify which file to serve
})



// =============== CATCH ALL FOR UNDEFINED ENDPOINTS =============== //
app.use((req, res) => res.sendStatus(404)); // 404 NOT FOUND

// =============== GLOBAL ERROR HANDLER =============== //
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/

module.exports = app;
