const router = require("express").Router();

const {
  getAllMovies,
  getOneMovie,
  updateMovie,
} = require("../controllers/movies.controller");

// get all movies
router.get("/movies", getAllMovies);
// get one movie
router.get("/movies/:movieId", getOneMovie);
// update movie
router.patch("/movies/:movieId", updateMovie);

module.exports = router;
