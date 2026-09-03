import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import validator from "validator";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import DoctorModel from "../models/doctorModel.js";
import DoctorAvailabilityModel from "../models/availabilityModel.js";
import AppointmentModel from "../models/appointmentModel.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Missing details");
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!validator.isEmail(normalizedEmail)) {
    throw new ApiError(400, "Incorrect email format");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password must contain at least 8 characters");
  }

  const existingUser = await UserModel.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .status(201)
    .json(new ApiResponse(201, { token }, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Incomplete details");
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!validator.isEmail(normalizedEmail)) {
    throw new ApiError(400, "Incorrect email format");
  }

  const existingUser = await UserModel.findOne({
    email: normalizedEmail,
  });

  if (!existingUser) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .status(200)
    .json(new ApiResponse(200, { token }, "User logged in successfully"));
});

export const getProfile = asyncHandler(async (req, res) => {
  const userData = await UserModel.findById(req.userId).select("-password");

  if (!userData) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, userData, "Successfully fetched user data."));
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, phone, address, dob, gender } = req.body;

  const userId = req.userId;
  const imageFile = req.file;

  if (!name || !phone || !address || !dob || !gender) {
    throw new ApiError(400, "Missing profile details");
  }

  let parsedAddress;

  try {
    parsedAddress = JSON.parse(address);
  } catch {
    throw new ApiError(400, "Invalid address format");
  }

  if (!parsedAddress.line1 || !parsedAddress.line2) {
    throw new ApiError(400, "Address must contain line1 and line2");
  }

  const updateData = {
    name: name,
    phone: phone,
    address: parsedAddress,
    dob,
    gender,
  };

  if (imageFile) {
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    updateData.image = imageUpload.secure_url;

    await fs.unlink(imageFile.path);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
    new: true,
  }).select("-password");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User profile updated successfully"),
    );
});

// book appointment
export const bookAppointment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { slotDate, slotTime } = req.body;
  const { doctorId } = req.params;

  // Validate input
  if (!doctorId) {
    throw new ApiError(400, "Doctor ID not found");
  }

  if (!slotDate || !slotTime) {
    throw new ApiError(400, "Slot date and time are required");
  }

  // Check doctor
  const doctorData = await DoctorModel.findById(doctorId).select("-password");

  if (!doctorData) {
    throw new ApiError(404, "Doctor not found");
  }

  if (!doctorData.available) {
    throw new ApiError(400, "Doctor is currently unavailable");
  }

  // Check whether slot is already booked
  let slots_booked = doctorData.slots_booked;

  if (!slots_booked[slotDate]) {
    slots_booked[slotDate] = [];
  }

  if (slots_booked[slotDate].includes(slotTime)) {
    throw new ApiError(400, "Slot not available");
  }

  // Add slot
  slots_booked[slotDate].push(slotTime);

  // Check user
  const userData = await UserModel.findById(userId);

  if (!userData) {
    throw new ApiError(404, "User not found");
  }

  // Create appointment
  const appointmentData = {
    userId,
    doctorId,
    amount: doctorData.fees,
    slotDate,
    slotTime,
  };

  const newAppointment = await AppointmentModel.create(appointmentData);

  // Update doctor's booked slots
  await DoctorModel.findByIdAndUpdate(doctorId, { slots_booked });

  res
    .status(201)
    .json(
      new ApiResponse(201, newAppointment, "Appointment booked successfully"),
    );
});

// user appointments for myappointment page
export const getUserAppointments = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const appointments = await AppointmentModel.find({ userId })
    .populate("doctorId", "name speciality image fees")
    .sort({ slotDate: -1, slotTime: -1 });

  if (appointments.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No appointments found"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointments,
        "Appointment list fetched successfully!",
      ),
    );
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { appointmentId } = req.body

  const appointmentData = await AppointmentModel.findById(appointmentId)

  if(appointmentData.userId.toString() !== userId){
    throw new ApiError(403, "You are not authorized to cancel this appointment")
  } 

  await AppointmentModel.findByIdAndUpdate(appointmentId, { status: "cancelled"})

  const {doctorId, slotDate, slotTime} = appointmentData
  
  const doctorData = await DoctorModel.findById(doctorId)

  let slots_booked = doctorData.slots_booked

  slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime)

  await DoctorModel.findByIdAndUpdate(doctorId, { slots_booked })

  res.status(200).json(new ApiResponse(200, null, "Appointment cancelled successfully"))
})