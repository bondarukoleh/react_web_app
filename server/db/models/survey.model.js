const mongoose = require('mongoose');
const {Schema} = mongoose;
const {RecipientScheme} = require('./recipient')

const surveyScheme = new Schema({
  title: {type: String, required: true, minlength: 5, maxlength: 50},
  subject: {type: String, required: true, minlength: 5, maxlength: 50},
  body: {type: String, required: true, minlength: 5, maxlength: 50},
  recipients: {type: [RecipientScheme], required: true, maxlength: 50},
  answerYes: {type: Number, default: 0},
  answerNo: {type: Number, default: 0},
  _user: {type: Schema.Types.ObjectID, ref: 'user'},
  dateSent: Date,
  lastResponded: Date,
});

const Model = mongoose.model('survey', surveyScheme);

module.exports = {Model};
