const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const router = require("./routes/tasks.routes");

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(router);

app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
