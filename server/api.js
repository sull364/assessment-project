const express = require("express");
const router = express.Router();
const fileController = require("./fileController.js");
const path = require('path');
const fs = require('fs');


// =============== EXISTING USER, LOGIN =============== //
router.post("/login", fileController.verifyUser, (req, res) => {
  console.log('api.js /login hit');
  return res.status(200).json("BOB POOP")
})

router.get("/", (req, res) => {
  return res.status(200).redirect(path.resolve(__dirname, "../index.html"))
})



// =============== CREATE NEW USER, SIGNUP =============== //
// router.post("/signup", fileController.createUser, (req, res) => {
//   res.status(200).render("../list.html")
// })

module.exports = router;