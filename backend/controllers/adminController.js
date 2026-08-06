import DoctorModel from "../models/doctorModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

// adding doctor
export const addDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !speciality ||
    !degree ||
    !experience ||
    !about ||
    !fees ||
    !address
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const imageFile = req.file;
  if (!imageFile) {
    throw new ApiError(400, "Image file is required");
  }

  const lowerCaseEmail = email.toLowerCase();

  const existingDoctor = await DoctorModel.findOne({ email: lowerCaseEmail });
  if (existingDoctor) {
    throw new ApiError(400, "Doctor with this email already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let parsedAddress;

  try {
    parsedAddress = JSON.parse(address);
  } catch {
    throw new ApiError(400, "Invalid address format");
  }

  if (!parsedAddress.line1 || !parsedAddress.line2) {
    throw new ApiError(400, "Address must contain line1 and line2");
  }

  const feesNumber = Number(fees);
  if (isNaN(feesNumber)) {
    throw new ApiError(400, "Fees must be a valid number");
  }

  // upload image to cloudinary
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    resource_type: "image",
  });
  const imageUrl = imageUpload.secure_url;

  try {
    await fs.unlink(imageFile.path);
  } catch (error) {
    console.error("Failed to delete temporary file:", error.message);
  }

  const doctorData = {
    name,
    email: lowerCaseEmail,
    password: hashedPassword,
    speciality,
    degree,
    experience,
    about,
    fees: feesNumber,
    address: parsedAddress,
    image: imageUrl,
  };

  const newDoctor = await DoctorModel.create(doctorData);

  if (!newDoctor) {
    throw new ApiError(500, "Failed to add doctor");
  }

  const doctor = await DoctorModel.findById(newDoctor._id).select("-password");

  res
    .status(201)
    .json(new ApiResponse(201, doctor, "Doctor added successfully"));
});
