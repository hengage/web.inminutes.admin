import { deleteCookie } from "../cookies";

export const signOut = async () => {
  await deleteCookie(process.env.NEXT_PUBLIC_SESSION_KEY!);
  return true;
};
