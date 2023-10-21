import connectDB from "./config/db.mjs";
import express from "express";
import cors from "cors";
import routes from "./routes/route.mjs";

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

app.get("/", (req, res) => {
  res.send("API is Running...");
});
app.use("/api/mindfull", routes);
