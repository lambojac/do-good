import LandingForm from "../models/landingForm";
import { Request, Response } from 'express';
import asynchandler from "express-async-handler";

export const landingpageform = asynchandler(async (req: Request, res: Response): Promise<void> => {
    
  const { fullname, email, phoneNumber, subject, message } = req.body;

  // Validation
  if (!fullname || !email || !phoneNumber || !subject || !message) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Save form data
  const newForm = await LandingForm.create({
    fullname,
    email,
    phoneNumber,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Form submitted successfully!",
    data: newForm,
  });
});
