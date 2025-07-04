import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String },
  university_name: { type: String, required: true },
});

export const UniversityForm = mongoose.model(
  "UniversityForm",
  universitySchema
);
