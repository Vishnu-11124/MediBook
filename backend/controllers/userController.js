import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import validator from "validator";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
import {v2 as cloudinary} from 'cloudinary'

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
  const { name, phone, address, dob, gender } = req.body
  const userId = req.userId
  const imageFile = req.file

  if(!name || !phone || !dob || !gender){
    throw new ApiError(400, "Datas are misssing")
  }

  await UserModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender})

  if(imageFile){
    const imageUpload = await cloudinary.uploader.upload(imageFile, {resource_type: 'image'})
    const imageURL = imageUpload.secure_url

    await UserModel.findByIdAndUpdate(userId, {image: imageURL})
  }

  res.status(200).json(new ApiResponse(200,{}, "User profile updated successfully"))
})