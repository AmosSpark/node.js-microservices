const Playlist = require("../models/playlist");

const controller = {
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
};

module.exports = controller;
