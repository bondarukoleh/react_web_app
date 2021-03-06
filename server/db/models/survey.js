const mongoose = require('mongoose');
const {Schema} = mongoose;
const {RecipientScheme} = require('./recipient');

const surveyScheme = new Schema({
  title: {type: String, required: true},
  subject: {type: String, required: true},
  body: {type: String, required: true},
  recipients: {type: [RecipientScheme], required: true},
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  _user: {type: Schema.Types.ObjectID, ref: 'user'},
  dateSent: Date,
  lastResponded: Date,
});

const Model = mongoose.model('survey', surveyScheme);

module.exports = {Model};
