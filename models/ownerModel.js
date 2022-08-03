const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  email: { type: String, required: true
 },
  password: { type: String, required: true },
  public_address: { type: String, required: true },
  private_address: { type: String, required: true },
});

module.exports = mongoose.model("Owner", ownerSchema);
