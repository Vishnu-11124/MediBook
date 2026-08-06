import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// adding doctor
export const addDoctor = asyncHandler(async (req, res) => {
    const {name, email, password, speciality, degree, experience, about, fees, address } = req.body
    if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
        throw new ApiError(400, "All fields are required")
    }

    const imageFile = req.file
    if(!imageFile){
        throw new ApiError(400, "Image file is required")
    }

    console.log({name, email, password, speciality, degree, experience, about, fees, address }, imageFile)

})