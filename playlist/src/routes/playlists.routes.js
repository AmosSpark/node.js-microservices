const router = require("express").Router();

const {
  getUserPlaylist,
  createNewPlaylist,
  addMovieToPlaylist,
  deleteUserPlaylist,
} = require("../controllers/playlists.controller");

// get all playlist
router.get("/playlists", getUserPlaylist);
// create playlist
router.post("/playlists/new", createNewPlaylist);
// add movie to playlist
router.patch("/playlists/:playlistId/add-movie", addMovieToPlaylist);
// delete playlist
router.delete("/playlists/:playlistId", deleteUserPlaylist);

module.exports = router;
