const mongoose = require("mongoose");

// ONLY USE THE BELOW IF YOU'RE CONNECTING VIA APPLICATION ON MONGO
const MONGO_URI =
  "mongodb+srv://lu0713:dangernoodle123@cluster0.sa2wo.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "starwars",
  })
  .then(() => {
    // console.log("Connected to Mongo DB."))
  })

  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// SET SCHEMA FOR 'users' COLLECTION
const usersSchema = new Schema({
  email: String,
  password: String
});

// CREATE A MODEL FOR 'users' COLLECTION AS PART OF EXPORT
const Users = mongoose.model("Users", usersSchema);

// SET SCHEMA FOR 'lists' COLLECTION
// const listsSchema = new Schema({
//   title: String,
//   completed: Boolean,
//   userid: {
//     type: Schema.Types.ObjectId,
//     ref: "Users",
//   }
// });

// CREATE A MODEL FOR 'lists' COLLECTION AS PART OF EXPORT
// const Lists = mongoose.model("Lists", listsSchema);


// EXPORT ALL MODULES
module.exports = {
  Users,
  // Lists
}