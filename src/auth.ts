import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";

// Sign up function
export const signup = async (email: string, password: string, name:string) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length > 0) {
      throw new Error("User already exists.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    const token = await userCredential.user.getIdToken();
    localStorage.setItem("userToken", token);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign in function
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    localStorage.setItem("userToken", token);
    return userCredential.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Sign out function
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("userToken");
  } catch (error) {
    throw error;
  }
};
