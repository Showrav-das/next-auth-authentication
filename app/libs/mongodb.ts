import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    console.log("process.env.DatabaseURL", process.env.DATABASE_URL);
    let conn = await mongoose.connect(String(process.env.DATABASE_URL));
    return conn;
  } catch (e:any) {
    throw new Error(e);
  }
}
