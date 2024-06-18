import express, {Request,Response,Application} from 'express';
import cors from "cors"
import {connectToMongo} from "./db"

import authRoutes from "./routes/authentication"
import noteRoutes from "./routes/notes"

connectToMongo()

const app : Application = express();

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/notes",noteRoutes)

const port : number = 8080;

app.get('/', (req :Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});