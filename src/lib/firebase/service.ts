import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { firestoreApp } from "./init";
import bcrypt from "bcrypt";

const firestore = firestoreApp;

export async function retrieveData(collectionName: string) {
  try {
    const snapShot = await getDocs(collection(firestore, collectionName));
    const data = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  } catch (error) {
    console.error("Error retrieving data from Firestore:", error);
    throw error;
  }
}

export async function retrieveDataById(collectionName: string, id: string) {
  try {
    const snapShot = await getDoc(doc(firestore, collectionName, id));
    const data = snapShot.data();
    return data;
  } catch (error) {
    console.error("Error retrieving data from Firestore:", error);
  }
}

export async function signUp(
  userData: { e: string; email: string; password: string; role?: string },
  callback: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback({ status: false, message: "User already exists" });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "user";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "User created successfully" });
      })
      .catch((error) => {
        callback({ status: false, message: error });
      });
  }
}

export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data) {
    const user = data[0];
    if (user && "password" in user && user.password !== "") {
      return user;
    } else {
      console.error("User found but no password field.");
      return null;
    }
  } else {
    console.error("No user found with this email.");
    return null;
  }
}

export async function signInWithGoogle(userData: any, callback: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    await updateDoc(doc(firestore, "users", data[0].id), userData)
      .then(() => {
        callback({ status: true, message: "User updated successfully" });
      })
      .catch((error) => {
        callback({ status: false, message: error });
      });
  } else {
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "User updated successfully" });
      })
      .catch((error) => {
        callback({ status: false, message: error });
      });
  }
}


