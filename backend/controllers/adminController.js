import DoctorAvailabilityModel from "../models/availabilityModel.js";
import DoctorModel from "../models/doctorModel.js";
import LeaveModel from "../models/leaveModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import jwt from "jsonwebtoken";

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

// admin login
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail !== process.env.ADMIN_EMAIL.toLowerCase()) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .status(200)
    .json(new ApiResponse(200, { token }, "Admin logged in successfully"));
});

// fetch all doctors list
export const allDoctors = asyncHandler(async (req, res) => {
  const doctors = await DoctorModel.find({}).select("-password");

  if (doctors.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No doctor data is found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, doctors, "Successfully fetched doctor list!"));
});

// fetch all leaves requests
export const allLeaveRequests = asyncHandler(async (req, res) => {
  const leaveRequests = await LeaveModel.find({ status: "pending" }).populate(
    "doctorId",
    "name email speciality image",
  );

  if (leaveRequests.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No pending leave requests found"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        leaveRequests,
        "Successfully fetched leave requests",
      ),
    );
});

// doctor availability
export const addDoctorAvailability = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;

  if (!doctorId) {
    throw new ApiError(400, "Doctor ID not found");
  }

  const { availability } = req.body;

  if (
    !availability ||
    !Array.isArray(availability) ||
    availability.length === 0
  ) {
    throw new ApiError(400, "Availability data is required");
  }

  const doctorData = await DoctorModel.findById(doctorId).select("-password");

  if (!doctorData) {
    throw new ApiError(404, "Doctor not found");
  }

  const existingAvailability = await DoctorAvailabilityModel.findOne({
    doctor: doctorId,
  });

  if (existingAvailability) {
    throw new ApiError(400, "Doctor availability already exists");
  }

  const doctorAvailability = await DoctorAvailabilityModel.create({
    doctor: doctorId,
    availability,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        doctorAvailability,
        "Doctor availability added successfully",
      ),
    );
});