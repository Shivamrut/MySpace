const mongo = require("./db");
mongo();

const express = require("express");
const app = express();
const authRoutes = require("./routes/authentication")
const notesRoutes = require("./routes/notes")

app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/notes",notesRoutes)
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(8080, () => {
  console.log("backend running");
});
