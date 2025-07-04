import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    country: { type: String, required: true },
    message: { type: String },
    dob: { type: String },
  },
  {
    timestamps: true,
  }
);

export const EnquiryForm = mongoose.model("Enquiry", enquirySchema);
