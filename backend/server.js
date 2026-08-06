import express from "express"
import cors from "cors"
import 'dotenv/config.js'
import errorHandler from './middlewares/error.middleware.js'
import connectDB from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"


const app = express()
const port = process.env.PORT || 4000

// db connection
connectDB()

// cloudinary connection
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)

app.get("/", (req, res) => {
    res.send("Api working...")
})

// error middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})