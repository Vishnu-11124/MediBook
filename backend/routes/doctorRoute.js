import express from 'express'
import { doctorLogin, getAllDoctors } from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.get('/all-doctors', getAllDoctors)

doctorRouter.post('/doctor-login', doctorLogin)

export default doctorRouter