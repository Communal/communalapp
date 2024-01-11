"use server";
import { currentUser } from "@clerk/nextjs";
import { supabase } from "@communalapp/config/supabase-client";

export type UserType = {
  username: string;
  firstName: string;
  lastName?: string;
  profilePicture: string;
  hasProfilePicture: string;
  email: string;
  addresses: string[];
}

export async function getUserData(): Promise<string> {
  const user = await currentUser();
  return JSON.stringify({
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
    profilePicture: user?.imageUrl,
    hasProfilePicture: user?.hasImage,
    email: user?.primaryEmailAddressId,
    addresses: user?.emailAddresses,
  });
}

export async function addNewUser({ interests=[] }: { interests: string[] }) {
  const user = await currentUser();
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        username: user?.username,
        firstName: user?.firstName,
        lastName: user?.lastName ?? "",
        interests: interests,
        communities: []
      },
    ]);
}