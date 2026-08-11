import express from "express";
import { addDoctor, adminLogin, allDoctors } from "../controllers/adminController.js";
import uplpoad from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/authAdmin.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor', isAdmin, uplpoad.single('image'), addDoctor)

adminRouter.post('/login', adminLogin)

adminRouter.get('/all-doctors', isAdmin, allDoctors)

export default adminRouter;