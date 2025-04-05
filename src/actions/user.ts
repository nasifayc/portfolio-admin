"use server";

import { createClient } from "@/auth/server";
import { handleError } from "@/lib/utils";
import { redirect } from "next/navigation";

export const signInWithGoogle = async () => {
  const { auth } = await createClient();
  const next = "/admin";
  const auth_callback_url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback?next=${encodeURIComponent(next)}`;

  const { data, error } = await auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    console.log("Error occured Google Auth", error);
    return handleError(error);
  }

  console.log("Google Auth data", data);
  redirect(data.url);

  //   return { errorMessage: null };
};

export const logoutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};
