const express = require("express");
const router = require("./router/index");
const { PORT } = require("./utility/config");
const session = require("express-session");
const cors = require("cors");

require("./models/index");
require("./cron");
require("./googleStrategy");
const app = express();
app.use(
  session({
    name: "karan",
    secret: "karan",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server Start At ${PORT}`);
});
