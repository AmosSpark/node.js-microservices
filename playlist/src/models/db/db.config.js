const mongoose = require("mongoose");

require("dotenv").config();

let URI = String(process.env.DATABASE_URL);

// Create connection to mongoDb
const createDbConnection = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => {
      console.error(`Couldn't connect to database`, err);
      process.exit(1);
    });
};

module.exports = createDbConnection;
