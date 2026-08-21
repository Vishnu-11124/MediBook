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
    leaveId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      trim: true,
    },
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

    availability: {
      type: [availabilitySchema],
      default: [],
    },

    leaves: {
      type: [leaveSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const DoctorAvailabilityModel = mongoose.model(
  "DoctorAvailability",
  doctorAvailabilitySchema,
);

export default DoctorAvailabilityModel;
