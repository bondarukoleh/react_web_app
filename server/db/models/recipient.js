const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipientScheme = new Schema({
  email: {type: String, required: true, minlength: 5, maxlength: 50},
  participated: {type: Boolean, default: false},
});

const Model = mongoose.model('recipient', recipientScheme);

module.exports = {Model};
