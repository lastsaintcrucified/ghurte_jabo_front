const mongoose = require("mongoose");

const { Schema } = mongoose;

const placeSchema = new Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  co_ordinantes: [Number],
  creator: { type: String, required: true },
});

module.exports = mongoose.model("place", placeSchema);
