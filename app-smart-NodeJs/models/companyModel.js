const mongoose = require("mongoose");
const Joi = require("joi")

//  chatGpt
// sechma of company
let companySchema = new mongoose.Schema({
  name: String,
  company_id: Number,
  img_url: String
})

exports.CompanyModel = mongoose.model("companies", companySchema);
// valid new compeny of details
exports.validateCompany = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(1).max(150).required(),
    company_id: Joi.number().min(1).max(9999).required(),
    img_url: Joi.string().min(1).max(300).allow(null,""),
  })
  return joiSchema.validate(_reqBody)
}