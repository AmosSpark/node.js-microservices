const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    default: 0,
  },
});

const Movie = mongoose.model("Movie", moviesSchema);

module.exports = Movie;
