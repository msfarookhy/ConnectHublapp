import connectDB from "./config/db.mjs";
import express from "express";
import cors from "cors";
import routes from "./routes/route.mjs";
import { fileURLToPath } from 'url';
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log("__dirname",__dirname);
if (process.env.NODE_ENV === "production") {


  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('/', function (req, res) { // Use '/' instead of './'
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
  });
    

}

app.use("/api/mindfull", routes);
