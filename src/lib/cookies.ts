"use server";
import { cookies } from "next/headers";

/**
 * Gets the session token from the cookie store.
 * @returns The session token.
 */
export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
};

/**
 * Sets the session token in the cookie store.
 * @param token - The session token to set.
 */
export const setCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

/**
 * Deletes the session token from the cookie store.
 */
export const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
