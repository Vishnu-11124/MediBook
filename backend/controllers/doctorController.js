import AppointmentModel from "../models/appointmentModel.js";
import DoctorModel from "../models/doctorModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await DoctorModel.find({}).select("-password -email");

  if (doctors.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "Doctor list is empty"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, doctors, "Successfully fetched doctor list"));
});

// doctor login
export const doctorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    throw new ApiError(400, "Invalid email format");
  }

  const doctorData = await DoctorModel.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!doctorData) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatchingPassword = await bcrypt.compare(
    password,
    doctorData.password,
  );

  if (!isMatchingPassword) {
    throw new ApiError(401, "Invalid email or password");
  }

  const docToken = jwt.sign(
    {
      id: doctorData._id,
      role: "doctor",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.status(200).json(
    new ApiResponse(
      200,
      {
        token: docToken,
      },
      "Doctor logged in successfully",
    ),
  );
});

export const allAppointmentsDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.doctorId;

  if (!doctorId) {
    throw new ApiError(401, "Doctor authentication required");
  }

  const appointmentList = await AppointmentModel.find({ doctorId })
    .populate("userId", "name image dob gender")
    .sort({ slotDate: -1, slotTime: -1 });

  if (appointmentList.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "Appointment list is empty"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointmentList,
        "Appointment list successfully fetched",
      ),
    );
});

export const appointmentCompleted = asyncHandler(async (req, res) => {
  const doctorId = req.doctorId;

  if (!doctorId) {
    throw new ApiError(401, "Doctor authentication required");
  }

  const { appointmentId } = req.body;

  if (!appointmentId) {
    throw new ApiError(400, "AppointmentId is required");
  }

  const appointmentData = await AppointmentModel.findById(appointmentId);

  if (!appointmentData) {
    throw new ApiError(404, "Appointment not found");
  }

  if (appointmentData.doctorId.toString() !== doctorId.toString()) {
    throw new ApiError(403, "You cannot make changes to this appointment");
  }

  if (appointmentData.status === "cancelled") {
    throw new ApiError(400, "Cancelled appointment cannot be completed");
  }

  if (appointmentData.status === "completed") {
    throw new ApiError(400, "Appointment is already completed");
  }

  await AppointmentModel.findByIdAndUpdate(appointmentId, {
    status: "completed",
  });

  res
    .status(200)
    .json(new ApiResponse(200, [], "Appointment successfully completed"));
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const doctorId = req.doctorId;

  if (!doctorId) {
    throw new ApiError(401, "Doctor authentication required");
  }

  const { appointmentId } = req.body;

  if (!appointmentId) {
    throw new ApiError(400, "AppointmentId is required");
  }

  const appointmentData = await AppointmentModel.findById(appointmentId);

  if (!appointmentData) {
    throw new ApiError(404, "Appointment not found");
  }

  if (appointmentData.doctorId.toString() !== doctorId.toString()) {
    throw new ApiError(403, "You cannot make changes to this appointment");
  }

  if (appointmentData.status === "cancelled") {
    throw new ApiError(400, "Cancelled appointment cannot be completed");
  }

  if (appointmentData.status === "completed") {
    throw new ApiError(400, "Appointment is already completed");
  }

  await AppointmentModel.findByIdAndUpdate(appointmentId, {
    status: "cancelled",
  });

  res
    .status(200)
    .json(new ApiResponse(200, [], "Appointment successfully cancelled"));
});