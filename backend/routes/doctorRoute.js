import express from 'express'
import { allAppointmentsDoctor, appointmentCompleted, cancelAppointment, dashboardData, doctorLogin, doctorProfileData, getAllDoctors, updatePaymentStatus } from '../controllers/doctorController.js'
import { isDoctor } from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/all-doctors', getAllDoctors)

doctorRouter.post('/doctor-login', doctorLogin)

doctorRouter.get('/appointmentslist', isDoctor, allAppointmentsDoctor)

doctorRouter.patch('/appointmentslist/complete-appointment', isDoctor, appointmentCompleted)

doctorRouter.patch('/appointmentslist/cancel-appointment', isDoctor, cancelAppointment)

doctorRouter.patch('/appointmentslist/update-payment-status', isDoctor, updatePaymentStatus)

doctorRouter.get('/dashboard-data', isDoctor, dashboardData)

doctorRouter.get('/doctor-profile', isDoctor, doctorProfileData)

export default doctorRouter