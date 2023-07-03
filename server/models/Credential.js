const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const Credential = mongoose.model("Credential", credentialSchema);
module.exports = Credential;
