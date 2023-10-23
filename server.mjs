import connectDB from "./config/db.mjs";
import express from "express";
import cors from "cors";
import routes from "./routes/route.mjs";
// import { fileURLToPath } from 'url';
// import path from "path"
import winston from 'winston';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Create a Winston logger
const logger = winston.createLogger({
  level: 'info', // Adjust the log level as needed
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log error messages to a file
    new winston.transports.File({ filename: 'combined.log' }), // Log all messages to a file
  ],
});
logger.info("AAAAAAAAAAAAAAAAA");

connectDB();
const app = express();

logger.info("bbbbbbbbbbbbbbb");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["https://mindfull-gurukulapp.vercel.app/"];

app.use(cors({
  origin: allowedOrigins, // Allow requests from the specified production domains
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // You may also need to set this to true depending on your use case
}));
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info("CCCCCCCCCCCCCCCCCCCCCCCCC");
  logger.info(`Server is running on port ${port}`);
});



  app.use(express.static('frontend','build'));
  app.get('/', function (req, res) { // Use '/' instead of './'
    res.sendFile(path.join('frontend','build','index.html'));

    logger.info("Production environment");
  });

logger.info("RRRRRRRRRRRRRR");

app.use("/api/mindfull", routes);

// es6Module.mjs
// import { fileURLToPath } from 'url';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log("__dirname,,,,,,,,,,:", __dirname);
