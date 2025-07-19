const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country:  { type: String, default: "" },
  gender:   { type: String, default: "Male" }
});

module.exports = mongoose.model('User', UserSchema);