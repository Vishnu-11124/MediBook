import DoctorModel from "../models/doctorModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

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
