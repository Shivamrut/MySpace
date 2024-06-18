const mongo = require("./db"); //
mongo(); //

const express = require("express"); //
const app = express(); //
const cors = require("cors") //
const authRoutes = require("./routes/authentication") //
const notesRoutes = require("./routes/notes") //
const testpoints = require("./routes/test")

app.use(cors()) //
app.use(express.json()) //
app.use("/api/auth", authRoutes) //
app.use("/api/notes", notesRoutes) //
app.use("/test", testpoints)
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(8080, () => {
  console.log("backend running");
});
