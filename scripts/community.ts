"use server";
import { currentUser } from "@clerk/nextjs";
import { CommunityPageType } from "@communalapp/app/(application)/comm/[slug]/page";
import { supabase } from "@communalapp/config/supabase-client";
import { unstable_noStore } from "next/cache";

export async function createCommunity(
  communityName: string,
  title: string,
  description?: string,
  logo?: string,
  category?: string,
) {
  const user = await currentUser();
  const { data, error } = await supabase.from("communities").insert([
    {
      community_name: communityName,
      title: title,
      category: category,
      description: description,
      logo: logo,
      users: [{ username: user?.username, role: "admin" }],
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

export async function getCommunityData(
  queryName: string,
): Promise<false | CommunityPageType> {
  unstable_noStore();
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .eq("community_name", queryName);

  if (error || !data.length) {
    return false;
  } else {
    let response = data[0];
    return {
      title: response["title"],
      description: response["description"],
      communityName: response["community_name"],
      logo: response["logo"],
      users: response["users"],
      category: response["category"],
    };
  }
}

export async function checkUserIfAdmin(
  users: { username: string; role: string }[] = [],
): Promise<boolean> {
  if (!users.length) return false;

  const user = await currentUser();

  const isAdmin = users.some((_user) => {
    return _user.username === user?.username && _user.role === "admin";
  });

  return isAdmin;
}

export async function checkIfPartOfCommunity(
  users: { username: string; role: string }[] = [],
): Promise<boolean> {
  if (!users.length) return false;

  const user = await currentUser();

  console.log("users", users);

  const isMember = users.some((_user) => {
    return _user.username === user?.username && _user.role === "member";
  });

  return isMember;
}

export async function followCommunity(communityName: string) {
  const communityData = await getCommunityData(communityName);
  if (!communityData) return;

  const user = await currentUser();

  let updatedUsers = communityData?.users?.concat({
    username: user?.username,
    role: "member",
  });

  console.log("updated users", updatedUsers);

  const { data, error } = await supabase
    .from("communities")
    .update({
      users: [...(updatedUsers as any)],
    })
    .match({ community_name: communityName })
    .select();

  console.log("error while following community", error);
  console.log("data after following community", data);
}
