const router = require("express").Router();

const {
  getUserPlaylist,
  createNewPlaylist,
} = require("../controllers/playlists.controller");

// get all playlist
router.get("/playlists", getUserPlaylist);
// create playlist
router.post("/playlists", createNewPlaylist);

module.exports = router;
