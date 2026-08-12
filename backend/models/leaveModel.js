import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    dates: [
      {
        type: Date,
        required: true,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const LeaveModel = mongoose.model("Leave", leaveSchema);

export default LeaveModel;