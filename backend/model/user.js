const mongoose = require("mongoose");

const Transaction = require("./transaction");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  balance: { type: Number, default: 0 },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  transactions: [Transaction.schema]
});

module.exports = mongoose.model("user", userSchema);