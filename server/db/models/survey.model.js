const mongoose = require('mongoose');
const {Schema} = mongoose;
const {Model: RecipientModel} = require('./recipient')

const surveyScheme = new Schema({
  title: {type: String, required: true, minlength: 5, maxlength: 50},
  subject: {type: String, required: true, minlength: 5, maxlength: 50},
  body: {type: String, required: true, minlength: 5, maxlength: 50},
  recipients: {type: [RecipientModel], required: true, maxlength: 50},
  answer: {type: Boolean, default: false},
});

const Model = mongoose.model('survey', surveyScheme);

module.exports = {Model};
