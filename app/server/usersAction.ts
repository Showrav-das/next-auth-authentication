import { User } from "../model/userModel";

export async function createUser(user: any) {
  try {
    console.log(user);
    await User.create(user);
  } catch (e: any) {
    throw new Error(e);
  }
}
