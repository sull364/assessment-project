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

router.get("/", fileController.getItems, (req, res) => {
  return res.status(200).json(res.locals.items);
})

router.post("/create", fileController.createItem, (req, res) => {
  console.log('create')
  return res.status(200).json(res.locals.item);
})

router.delete("/delete", fileController.deleteItem, (req, res) => {
  console.log('delete')
  return res.status(200).json("item deleted");
})

router.patch("/update", fileController.updateItem, (req, res) => {
  console.log('update')
  return res.status(200).json(res.locals.updated);
})

module.exports = router;