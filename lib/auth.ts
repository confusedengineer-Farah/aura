import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

async function createUserDocument(user: UserCredential["user"]) {
  const userRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName ?? "",
      email: user.email,
      photoURL: user.photoURL ?? "",
      role: "user",
      createdAt: serverTimestamp(),
    });
  }
}

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

  await createUserDocument({
    ...userCredential.user,
    displayName: name,
  } as UserCredential["user"]);

  return userCredential;
}

export async function login(
  email: string,
  password: string
): Promise<UserCredential> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  await createUserDocument(userCredential.user);

  return userCredential;
}

export async function googleLogin(): Promise<UserCredential> {
  const userCredential = await signInWithPopup(
    auth,
    googleProvider
  );

  await createUserDocument(userCredential.user);

  return userCredential;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}