
const mongoose = require('mongoose');
const {config} =require("../config/secrets")
main().catch(err => console.log(err));

async function main() {
  // to avoid for warning
  mongoose.set('strictQuery', false);
  // diffine the connection with mongo db
  await mongoose.connect(`mongodb+srv://${config.db_user}:${config.db_pass}@cluster0.tbnyt3u.mongodb.net/smart`);
  console.log("mongo connect smart local");
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}