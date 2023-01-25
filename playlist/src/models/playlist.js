const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  list: {
    movie_id: {
      type: String,
    },
    genre: String,
    star: Number,
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
