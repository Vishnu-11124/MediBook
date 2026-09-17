import AppointmentModel from "../models/appointmentModel.js";
import DoctorModel from "../models/doctorModel.js";
import LeaveModel from "../models/leaveModel.js";
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
    throw new ApiError(400, "Appointment is already cancelled");
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

export const updatePaymentStatus = asyncHandler(async (req, res) => {
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
    throw new ApiError(400, "Cancelled appointment cannot be marked as paid");
  }

  if (appointmentData.paymentStatus === "paid") {
    throw new ApiError(400, "Appointment is already paid");
  }

  await AppointmentModel.findByIdAndUpdate(appointmentId, {
    paymentStatus: "paid",
  });

  res
    .status(200)
    .json(new ApiResponse(200, [], "Appointment successfully marked as paid"));
});

//dashboard
export const dashboardData = asyncHandler(async (req, res) => {
  const doctorId = req.doctorId;

  if (!doctorId) {
    throw new ApiError(401, "Doctor authentication required");
  }

  const appointments = await AppointmentModel.find({ doctorId }).populate(
    "userId",
    "name image dob",
  );

  let earnings = 0;
  const patients = [];

  appointments.forEach((item) => {
    // Calculate earnings
    if (item.status === "completed" && item.paymentStatus === "paid") {
      earnings += item.amount;
    }

    // Calculate unique patients
    const userId = item.userId.toString();

    if (!patients.includes(userId)) {
      patients.push(userId);
    }
  });

  const dashData = {
    earnings,
    appointments: appointments.length,
    patients: patients.length,
    latestAppointments: appointments.slice().reverse().slice(0, 5),
  };

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        dashData,
        "Successfully fetched doctor dashboard data",
      ),
    );
});

//doctor profile data
export const doctorProfileData = asyncHandler(async (req, res) => {
  const doctorId = req.doctorId;

  if (!doctorId) {
    throw new ApiError(401, "Doctor authentication required");
  }

  const profileData = await DoctorModel.findById(doctorId).select("-password");

  if (!profileData) {
    throw new ApiError(404, "Doctor not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, profileData, "Doctor details fetched successfully"),
    );
});

// update profile
export const updateDoctorProfile = asyncHandler(async (req, res) => {
  const doctorId = req.doctorId;

  if (!doctorId) {
    throw new ApiError(401, "Doctor authentication required");
  }

  const { fees, available, address } = req.body;

  const updateData = {};

  // Validate fees
  if (fees !== undefined) {
    if (typeof fees !== "number" || !Number.isFinite(fees) || fees < 0) {
      throw new ApiError(400, "Fees must be a valid number");
    }

    updateData.fees = fees;
  }

  // Validate availability
  if (available !== undefined) {
    if (typeof available !== "boolean") {
      throw new ApiError(400, "Available must be a boolean");
    }

    updateData.available = available;
  }

  // Validate address
  if (address !== undefined) {
    if (
      typeof address !== "object" ||
      address === null ||
      Array.isArray(address)
    ) {
      throw new ApiError(400, "Address must be an object");
    }

    if (
      typeof address.line1 !== "string" ||
      typeof address.line2 !== "string"
    ) {
      throw new ApiError(400, "Address line1 and line2 must be strings");
    }

    if (!address.line1.trim() || !address.line2.trim()) {
      throw new ApiError(400, "Address line1 and line2 cannot be empty");
    }

    updateData.address = {
      line1: address.line1.trim(),
      line2: address.line2.trim(),
    };
  }

  // No fields provided
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No data provided for update");
  }

  const updatedDoctor = await DoctorModel.findByIdAndUpdate(
    doctorId,
    updateData,
    { new: true },
  ).select("-password");

  if (!updatedDoctor) {
    throw new ApiError(404, "Doctor not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedDoctor, "Profile updated successfully"));
});

// leave request
export const leaveRequest = asyncHandler(async (req, res) => {
  const doctorId = req.doctorId;

  if (!doctorId) {
    throw new ApiError(401, "Doctor authentication required");
  }

  const { reason, dates } = req.body;

  if (!reason || !dates) {
    throw new ApiError(400, "Reason and dates are required");
  }

  if (typeof reason !== "string" || !reason.trim()) {
    throw new ApiError(400, "Reason must be a valid text");
  }

  if (!Array.isArray(dates) || dates.length === 0) {
    throw new ApiError(400, "Leave dates are required");
  }

  const leaveRequestData = {
    doctorId,
    reason: reason.trim(),
    dates,
  };

  const newLeaveRequest = await LeaveModel.create(leaveRequestData);

  if (!newLeaveRequest) {
    throw new ApiError(400, "Leave request could not be created");
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, newLeaveRequest, "Leave request sent successfully"),
    );
});

export const getAllLeaveRequests = asyncHandler(async (req, res) => {
  const doctorId = req.doctorId;

  if (!doctorId) {
    throw new ApiError(401, "Doctor authentication required");
  }

  const allRequestList = await LeaveModel.find({ doctorId }).sort({
    createdAt: -1,
  });

  if (allRequestList.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No leave requests found"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allRequestList,
        "Successfully fetched all leave requests",
      ),
    );
});
