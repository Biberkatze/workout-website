const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", async (req, res) => {
  const data = await db.getAllData();
  res.render("index", { data });
});

app.post("/add", async (req, res) => {
  const { date, exercise, weight, reps } = req.body;
  await db.insertData(date, exercise, weight, reps);
  res.sendStatus(200);
});

app.get("/data", async (req, res) => {
  const data = await db.getAllData();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
