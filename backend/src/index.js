import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./db/mongodb.js";
import errorHandler from "./utils/errorHandler.js";
import vehicleRoutes from "./routes/vehicleRoute.js";
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", vehicleRoutes);

app.use(errorHandler);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log("MongoDB connect failed server off");
    process.exit(1);
  }
};

startServer();
