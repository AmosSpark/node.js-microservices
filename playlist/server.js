const app = require("./app");

const createDbConnection = require("./src/models/db/db.config");
const PORT = process.env.PORT || 7002;

// Connects to mongodb
createDbConnection();

app.listen(PORT, () => console.log(`Server now running on port: ${PORT}`));
