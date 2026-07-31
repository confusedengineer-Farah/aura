import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<UserCredential> {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: name,
  });

  return userCredential;
}

export async function login(
  email: string,
  password: string
): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function googleLogin(): Promise<UserCredential> {
  return await signInWithPopup(auth, googleProvider);
}

export async function logout(): Promise<void> {
  await signOut(auth);
}