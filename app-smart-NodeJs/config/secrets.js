// secrete data - sensetive information
require("dotenv").config();
exports.config = {
  token_secret:process.env.TOKEN_SECRET,
  db_pass:process.env.PASS_DB,
  db_user:process.env.USER_DB
  // db_pass:"EFRAIM12",
  // db_user:"nati_efraim",
  // token_secret:"monkeysSecret",
  // db_url:""
}