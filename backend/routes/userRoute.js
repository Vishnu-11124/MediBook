import express from 'express'
import { bookAppointment, getProfile, getUserAppointments, loginUser, registerUser, updateUserProfile } from '../controllers/userController.js'
import { authUser } from '../middlewares/authUser.js'
import uplpoad from '../middlewares/multer.js'
import { doctorDetails } from '../controllers/adminController.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUser, getProfile)

userRouter.post('/update-profile', uplpoad.single('image'), authUser, updateUserProfile)

userRouter.get('/doctors/:doctorId/doctor-details', doctorDetails)

userRouter.post('/doctors/:doctorId/book-appointment', authUser, bookAppointment)

userRouter.get('/appointments', authUser, getUserAppointments)

export default userRouter