import mongoose from "mongoose";

const taskSM = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    points: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userinfo",
      required: true,
    },
  },
  { timestamps: true },
);

export const task = mongoose.model("taskinfo", taskSM);
