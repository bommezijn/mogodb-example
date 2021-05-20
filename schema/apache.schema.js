const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
  firstname: String,
  lastname: String
})

module.exports = user;