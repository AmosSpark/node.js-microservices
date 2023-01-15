const router = require("express").Router();

const {
  getAllMovies,
  getOneMovie,
} = require("../controllers/movies.controller");

// get all movies
router.get("/movies", getAllMovies);
// get one movie
router.get("/movies/:movieId", getOneMovie);

module.exports = router;
