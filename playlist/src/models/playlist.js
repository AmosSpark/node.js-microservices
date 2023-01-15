const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  list: [
    {
      movie_id: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
      },
    },
  ],
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
