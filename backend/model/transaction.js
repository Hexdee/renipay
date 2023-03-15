const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String },
  payer: { type: String },
  payer_address: { type: String },
  amount: { type: Number, default: null },
  merchant: { type: String },
  description: { type: String },
  status: { type: String, default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("transaction", transactionSchema);