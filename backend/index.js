require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/db/db");
connectToDb();
app.listen(3000, (req, res) => {
  console.log("server runing on port 3000");
});
