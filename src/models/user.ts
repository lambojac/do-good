import mongoose, { Schema } from 'mongoose';
import { UserDataProps } from '../types';

export interface UserDocument extends UserDataProps { }

const UserSchema = new Schema({
  fullName:{ type: String },
  confirmPassword:{ type: String },
  lastName: { type: String },
  password: { type: String },
  subject: { type: String },
  message: { type: String },
  gender: { type: String },
  address: { type: String },
  country: { type: String },

  date_created: { type: String, default: new Date().toISOString() },
  email: { type: String, },
  phone_number: { type: String },
  role: {
    type: String,
    enum: ["superadmin", "admin", "software_developer", "content_creator", "digital_marketer", "customer"],
    default: "customer"
  },
  zoom_username: { type: String },
  skype_username: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  profilePicture: { type: String, default: null },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true
});

export default mongoose.model<UserDocument>('User', UserSchema);