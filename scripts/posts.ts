"use server";

import { currentUser } from "@clerk/nextjs";
import { supabase } from "@communalapp/config/supabase-client";
import { fetchUserCommunities } from ".";

export async function postForCommunity(communityName: string, content: string) {
  const user = await currentUser();
  const { data, error } = await supabase
  .from('posts')
  .insert([
    {
      "content": content,
      "community_name": communityName,
      "username": user?.username,
      "profile_picture": user?.imageUrl || ""
    }
  ])
    .select()
  
  console.log("after posting", data);
  console.log("error while posting", error);
}

export async function fetchCommunityPosts(communityName: string) {
  let { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('community_name', communityName);
  
  console.log("POSTS WHILE FETCHING FOR COMMUNITY [", communityName, ']: ', posts);
  return posts;
}

export async function createFeed() {
  const userCommunities = await fetchUserCommunities();
  const communityNameList = [...userCommunities.map((community) => {
    return community.communityName
  })];

  let feedContentPreload: any = [];
  communityNameList.map(async (communityName) => {
    const communityPostsResponse = await fetchCommunityPosts(communityName);
    feedContentPreload.push(communityPostsResponse);
  });

  console.log("POSTS WHILE FETCHING FOR COMMUNITIES [", communityNameList, ']: ', feedContentPreload);

  return feedContentPreload;
}