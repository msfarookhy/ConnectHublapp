import express from "express";
import cors from "cors";
import connectDB from "./config/db.mjs";
import routes from "./routes/route.mjs";
import path from 'path';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

// Connect to the database
connectDB();

// Define a root route
app.get("/", (req, res) => {
  res.send("API is Running...");
});

// Routes middleware
app.use("/api/mindfull", routes);


const __dirname = path.resolve()

if( process.env.NODE_ENV == "production"){
  app.use(express.static(path.join(__dirname, '/client/build')))
  
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
    })
    }



// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
