import { auth } from "../../firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

export const register = async (displayName: string, email: string, password: string) => {
  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's display name
    await updateProfile(user, { displayName });

    // Send email verification
    await sendEmailVerification(user);

    return { user, message: "Verification email sent. Please check your inbox." };
  } catch (error) {
    return { error: (error as Error).message };  
  }
};


export const login = async (email: string, password: string) => {
  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    return { error: (error as Error).message };  
  }
};
