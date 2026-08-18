import express from 'express'
import { getProfile, loginUser, registerUser, updateUserProfile } from '../controllers/userController.js'
import { authUser } from '../middlewares/authUser.js'
import uplpoad from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUser, getProfile)

userRouter.post('/update-profile', uplpoad.single('image'), authUser, updateUserProfile)

export default userRouter