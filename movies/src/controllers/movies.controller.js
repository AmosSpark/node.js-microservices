const Movie = require("../models/movie");

const fs = require("fs");

const path = require("path");

const movies_data = fs.readFileSync(
  path.join("src/models", "db", "movies.data.json"),
  "utf-8"
);

const controller = {
  async getAllMovies(req, res) {
    try {
      let movies = await Movie.find();

      // if db is empty, insert data
      if (movies.length < 1) {
        movies = await Movie.insertMany(JSON.parse(movies_data));
      }

      res.status(200).json({
        status_code: 200,
        result: await Movie.countDocuments(),
        message: `Found all movies.`,
        data: movies,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async getOneMovie(req, res) {
    try {
      const movie_id = req.params.movieId;

      const movie = await Movie.findById(movie_id);

      if (!movie) throw new Error(`Movie not found.`);

      const count = await Movie.find().count({
        _id: movie_id,
      });

      res.status(200).json({
        status_code: 200,
        result: count,
        message: `Movie found.`,
        data: movie,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = controller;
