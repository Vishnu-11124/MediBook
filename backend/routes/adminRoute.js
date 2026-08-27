import express from "express";
import { addDoctor, addDoctorAvailability, adminLogin, allDoctors, allLeaveRequests, doctorDetails } from "../controllers/adminController.js";
import uplpoad from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/authAdmin.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor', isAdmin, uplpoad.single('image'), addDoctor)

adminRouter.post('/login', adminLogin)

adminRouter.get('/all-doctors', isAdmin, allDoctors)

adminRouter.get('/doctors/leave-requests', isAdmin, allLeaveRequests)

adminRouter.post('/doctors/:doctorId/add-availability', isAdmin, addDoctorAvailability)

adminRouter.get('/doctors/:doctorId/doctor-details', isAdmin, doctorDetails)

export default adminRouter;