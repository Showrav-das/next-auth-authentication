import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: any;
      [key: string]: any;
    }
  }
}

if (!process.env.MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

const MONGO_URI = process.env.MONGO_URI;

let cached = (global as any).mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
