import DoctorModel from "../models/doctorModel.js";
import ApiError from "../utils/ApiError.js";
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

// doctor login
export const doctorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const doctorData = await DoctorModel.findOne({ email: email.trim() });
  if (!doctorData) {
    throw new ApiError(404, "Doctor not found");
  }

  if (doctorData.password !== password) {
    throw new ApiError(401, "Invalid password");
  }

  const docToken = jwt.sign({ role: "doctor" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { token: docToken },
        "Doctor logged in successfully",
      ),
    );
});
