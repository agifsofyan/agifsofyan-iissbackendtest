// const sql = require("../config/db");

const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: String,
    number: String,
    birthplace: String,
    birthday: String,
    info: String,
},{
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);