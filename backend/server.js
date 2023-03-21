const { yellow } = require("colors");
const express = require("express");
const path = require("path");
configPath = path.join(__dirname, "..", "config", ".env");
// console.log(require("dotenv").config({ path: configPath }));
// console.log(process.env.PORT);
// console.log(process.env.veronika);
// console.log(process.env.andriy);
require("dotenv").config({ path: configPath });
const connectDB = require("../config/db");
require("colors");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1", require("./routers/filmsRoutes"));

app.use("*", (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "Not found",
  });

  next();
});

app.use(require("./midellewares/errorHandler"));

connectDB();
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}`.yellow.bold.italic
  );
});
