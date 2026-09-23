import express from "express";
import { addDoctor, addDoctorAvailability, addLeave, adminDashboardData, adminLogin, allAppointments, allDoctors, allLeaveRequests, approvedLeaveList, approveLeaveRequest, doctorDetails, rejectLeaveRequest, removeLeaves } from "../controllers/adminController.js";
import uplpoad from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/authAdmin.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor', isAdmin, uplpoad.single('image'), addDoctor)

adminRouter.post('/login', adminLogin)

adminRouter.get('/all-doctors', isAdmin, allDoctors)

adminRouter.get('/doctors/leave-requests', isAdmin, allLeaveRequests)

adminRouter.post('/doctors/:doctorId/add-availability', isAdmin, addDoctorAvailability)

adminRouter.get('/doctors/:doctorId/doctor-details', isAdmin, doctorDetails)

adminRouter.get('/all-appointments', isAdmin, allAppointments)

adminRouter.get('/dashboard-data', isAdmin, adminDashboardData)

adminRouter.patch('/request-list/reject-request', isAdmin, rejectLeaveRequest)

adminRouter.patch('/request-list/approve-request', isAdmin, approveLeaveRequest)

adminRouter.get('/approved-leave-list', isAdmin, approvedLeaveList)

adminRouter.patch('/approved-leave-list/add-leave', isAdmin, addLeave)

adminRouter.patch('/doctors/:doctorId/doctor-details/remove-leave-dates', isAdmin, removeLeaves)

export default adminRouter;