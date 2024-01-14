"use server";
import { currentUser } from "@clerk/nextjs";
import { supabase } from "@communalapp/config/supabase-client";

export async function createCommunity(
  communityName: string,
  title: string,
  description?: string,
  logo?: string,
  category?: string
) {
  const user = await currentUser();
  const { data, error } = await supabase
    .from('communities')
    .insert([
      {
        "community_name": communityName,
        "title": title,
        "category": category,
        "description": description,
        "logo": logo,
        "users": [
          { "username": user?.username, "role": "admin" }
        ],
      },
    ]);
  
  if (error) {
    console.log("error while creating community", error);
    return false;
  } else {
    console.log("added community to db", data);
    return true;
  }
}