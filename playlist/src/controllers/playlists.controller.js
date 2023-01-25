const Playlist = require("../models/playlist");

const consumer = require("../../consumer");

const axios = require("axios");

require("dotenv").config();

consumer.listen();

const movies_host = String(process.env.movies_host);

const controller = {
  // get playlist
  async getUserPlaylist(req, res) {
    try {
      const playlist = await Playlist.find();

      res.status(200).json({
        status_code: 200,
        result: await Playlist.countDocuments(),
        message: `Found all playlist.`,
        data: playlist,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // create playlist
  async createNewPlaylist(req, res) {
    try {
      const playlist = await Playlist.create(req.body);

      res.status(201).json({
        status_code: 201,
        message: `New playlist created.`,
        data: playlist,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // add movie to playlist
  async addMovieToPlaylist(req, res) {
    try {
      const playlist_id = req.params.playlistId;
      // get plalylist
      const playlist = await Playlist.findById(playlist_id);

      if (!playlist) throw new Error("Playlist not found.");

      const movie_id = req.body.movie_id;

      let movie = await axios.get(`${movies_host}/${movie_id}`);

      movie = movie.data.data;

      const updated_playlist = await Playlist.findOneAndUpdate(
        playlist_id,
        {
          list: [
            {
              movie_id,
              genre: movie.genre,
              star: movie.star,
            },
          ],
        },
        { new: true }
      );

      res.status(200).json({
        status_code: 200,
        result: await Playlist.countDocuments(),
        message: `Movie added to playlist.`,
        data: updated_playlist,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // delete playlist
  async deleteUserPlaylist(req, res) {
    try {
      const playlist_id = req.params.playlistId;

      const playlist = await Playlist.findByIdAndRemove(playlist_id);

      if (!playlist) throw new Error("Playlist not found.");

      res.status(204).json({
        status_code: 204,
        message: `Playlist deleted.`,
        data: null,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = controller;
