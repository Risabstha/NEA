import express from "express";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers); // Fetch users

export default router;
