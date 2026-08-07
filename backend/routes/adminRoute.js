import express from "express";
import { addDoctor, adminLogin } from "../controllers/adminController.js";
import uplpoad from "../middlewares/multer.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor', uplpoad.single('image'), addDoctor)

adminRouter.post('/login', adminLogin)

export default adminRouter;