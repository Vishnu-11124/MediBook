import express from "express";
import { addDoctor } from "../controllers/adminController.js";
import uplpoad from "../middlewares/multer.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor', uplpoad.single('image'), addDoctor)

export default adminRouter;