import express from "express";
import { admin } from "../config/firebase.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create user in Firebase Authentication
    const user = await admin.auth().createUser({
      email,
      password,
      displayName,
      emailVerified: false,
    });

    // Generate email verification link
    const actionLink = await admin.auth().generateEmailVerificationLink(email);

    // (Optional) Send the email using a mailing service like Nodemailer
    console.log(`Send this link to user: ${actionLink}`);

    res.status(201).json({ message: "User registered, verification email sent!", actionLink });
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
  
      // Sign in the user with Firebase Authentication
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check if email is verified
      if (!user.emailVerified) {
        return res.status(403).json({ error: "Email is not verified. Please verify your email first." });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ uid: user.uid, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });
  
export default router;
