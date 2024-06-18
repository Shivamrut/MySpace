import express from 'express';
import cors from "cors"
import mongo from "./db"

mongo()

const app = express();

app.use(cors())
app.use(express.json())

const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});