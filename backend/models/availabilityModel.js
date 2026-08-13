import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    days: [
      {
        type: String,
        required: true,
      },
    ],
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    slotDuration: {
      type: Number,
      default: 30,
    },
  },
  { _id: false },
);

const leaveSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    reason: String,
  },
  { _id: false },
);

const doctorAvailabilitySchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      unique: true,
    },

    availability: [availabilitySchema],

    leaves: [leaveSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("DoctorAvailability", doctorAvailabilitySchema);
