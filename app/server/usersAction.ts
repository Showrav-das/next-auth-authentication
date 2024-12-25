import { User } from "../model/userModel";

export async function createUser(user) {
  try {
    console.log(user);
    await User.create(user);
  } catch (e) {
    throw new Error(e);
  }
}
