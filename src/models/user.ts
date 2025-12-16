import mongoose, { Schema } from 'mongoose';
import { UserDataProps } from '../types';

export interface UserDocument extends UserDataProps {
  save(): unknown;
  updatedAt: Date;
  createdAt: Date;
  verificationCodeExpires: Date;
  verificationCode: any;
  isVerified: any;
  fullName?: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
  address: string;
}

const UserSchema = new Schema({
  fullName:{ type: String },
  password: { type: String },
  subject: { type: String },
  message: { type: String },
  gender: { type: String },
   residentialAddress: { type: String }, 
  deliveryAddress: { type: String }, 
  country: { type: String },

  date_created: { type: String, default: new Date().toISOString() },
  email: { type: String, },
  phone_number: { type: String },
  role: {
  type: String,
  enum: ["superadmin", "admin", "vendor", "customer"],
  default: "customer"
},
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  profilePicture: { type: String, default: null },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  verificationCodeExpires: { type: Date },
  lastLogin: { type: Date, default: null }

}, {
  timestamps: true
});

export default mongoose.model<UserDocument>('User', UserSchema);