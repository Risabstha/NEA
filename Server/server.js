import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import Meeting from './models/meetingModel.js'; // Adjust the path according to your file structure
import userRoutes from './routes/userRoutes.js'

connectDB();

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);



app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

