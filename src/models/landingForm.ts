import mongoose, { Schema, Document } from "mongoose";

export interface LandingFormDocument extends Document {
  fullname: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

const LandingFormSchema = new Schema<LandingFormDocument>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<LandingFormDocument>(
  "LandingForm",
  LandingFormSchema
);
