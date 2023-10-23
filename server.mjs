import connectDB from "./config/db.mjs";
import express from "express";
import cors from "cors";
import routes from "./routes/route.mjs";

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://mindfull-gurukulapp.vercel.app" }));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


if (process.env.NODE_ENV === "production") {

  const path = require("path")
  console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  
  app.get('/', function (req, res) {
    console.log("Sharokhhhhhhh");
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
  });
  

}

app.use("/api/mindfull", routes);
