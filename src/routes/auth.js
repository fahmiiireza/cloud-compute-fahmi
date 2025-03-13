import express from "express";
import admin from "firebase-admin";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email app password
    },
  });
  
  router.post("/register", async (req, res) => {
    try {
      const { email, password, displayName } = req.body;
      if (!email || !password || !displayName) {
        return res.status(400).json({ error: "Email, password, and display name are required" });
      }
  
      // Create user in Firebase
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName,
      });
  
      // Generate Email Verification Link
      const actionCodeSettings = {
        url: `${process.env.FRONTEND_URL}/verify-email?email=${email}`,
        handleCodeInApp: true,
      };
      const verificationLink = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);
  
      // Send Verification Email
      const mailOptions = {
        from: `"Workout Tracker" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Hello ${displayName},</p>
               <p>Click the link below to verify your email:</p>
               <a href="${verificationLink}">${verificationLink}</a>
               <p>If you did not sign up for this account, please ignore this email.</p>`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: "User registered successfully! Check your email for verification." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

router.post("/verify-email", async (req, res) => {
    try {
      const { oobCode } = req.body; // oobCode is the verification code from Firebase
  
      if (!oobCode) {
        return res.status(400).json({ error: "Verification code is required" });
      }
  
      // Confirm the email verification
      await admin.auth().applyActionCode(oobCode);
  
      res.status(200).json({ message: "Email successfully verified!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  import jwt from "jsonwebtoken";

  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // Sign in the user using Firebase Admin SDK
      const userRecord = await admin.auth().getUserByEmail(email);
  
      // Check if email is verified
      if (!userRecord.emailVerified) {
        return res.status(403).json({ error: "Email is not verified. Please verify your email first." });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ uid: userRecord.uid, email: userRecord.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });
export default router;
