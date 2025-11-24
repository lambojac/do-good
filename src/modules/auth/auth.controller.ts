import { Request, Response } from 'express';
import User from '../../models/user'; 
import bcrypt from 'bcrypt';
import asynchandler from "express-async-handler";
import genToken from "../../utils/genToken";
import { UserDocument } from '../../models/user';
import cloudinary from '../../config/cloudinary';
import crypto from 'crypto';
import { sendEmail } from '../../utils/email'; 


// create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, password, confirmPassword,  email  } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      password: hashedPassword,
      email,
      confirmPassword
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


//login
export const loginUser = asynchandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    // Validate required fields
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide correct email and password.");
    }
  
    // Find user by email
    const user = await User.findOne({ email }) as UserDocument | null;
  
    if (!user) {
      res.status(400);
      throw new Error("User not found, Please sign up!");
    }
  
    
    const passwordIsValid = await bcrypt.compare(password, user.password);
  
    if (passwordIsValid) {
     
      const token = genToken(user.id.toString()); 
  
     
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 24 * 60 * 60), 
        sameSite: "none",
        secure: true, 
      });
  
      const { id,  email, role, firstName,
        lastName,
        phone_number} = user;
  
      res.status(200).json({
        id: id.toString(), 
        email,
        token,
        role,
        firstName,
         lastName,
         phone_number,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or password.");
    }
  });


 export  const logOut = asynchandler(async (_req: Request, res: Response): Promise<void> => {
    // expire the session
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(),
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ message: "you are Sucessfully logged out" });
  });




//getallusers
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.find();
      const formattedUsers = users.map((user) => ({
        user_name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        date_created: new Date(user.date_created).toISOString().split("T")[0], 
        phone: user.phone_number,
        user_role: user.role,
        user_id: user._id.toString(),
        status: user.isDeleted ? "non-active" : "active",
      }));
  
      res.status(200).json(formattedUsers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };


//getuserbyid
export const getUserById = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' }); 
      }
      return res.status(200).json({
        ...user.toObject(), 
        status: user.isDeleted ? "non-active" : "active", 
      }); 
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: message }); 
    }
  };
  
//update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let updatedData = req.body;

    // Handle password update
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profile_pictures', 
        transformation: [{ width: 300, height: 300, crop: 'fill' }], 
      });
      updatedData.profilePicture = result.secure_url; 
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
// //delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deactivated successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
// restore user
export const restoreUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const restoredUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: false, deletedAt: null },
      { new: true }
    );

    if (!restoredUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User reactivated successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Generate reset token
      const token = crypto.randomBytes(32).toString('hex');
   console.log(token)
      // Set token and expiry in user record
      user.resetPasswordToken = token;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); 
      await user.save();
  
      // Send reset email
      const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;
      await sendEmail(user.email, 'Password Reset Request', `Click this link to reset: ${resetUrl}`);
  
     return res.status(200).json({ message: 'Reset email sent' });
    } catch (error) {
     return res.status(500).json({ message: 'Server error' });
    }
  };

// reset password
export const resetPassword= async (req:Request, res:Response) => {
    const { token, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  
    try {
      const user = await User.findOne({ 
        resetPasswordToken: token, 
        resetPasswordExpires: { $gt: new Date() } 
      });
  
      if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update user password and remove token fields
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      return res.status(200).json({ message: 'Password successfully reset' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  }