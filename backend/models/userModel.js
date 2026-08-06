import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    address: {
      line1: String,
      line2: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    dob: { type: String, default: "Not selected" },
    phone: { type: String, default: "Not selected" },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
