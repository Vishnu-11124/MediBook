import express from 'express'
import { allAppointmentsDoctor, doctorLogin, getAllDoctors } from '../controllers/doctorController.js'
import { isDoctor } from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/all-doctors', getAllDoctors)

doctorRouter.post('/doctor-login', doctorLogin)

doctorRouter.get('/appointmentslist', isDoctor, allAppointmentsDoctor)

export default doctorRouter