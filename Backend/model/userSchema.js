import mongoose from "mongoose";

const userSM = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const user = mongoose.model("userinfo", userSM);
