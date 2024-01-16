"use server";

import { currentUser } from "@clerk/nextjs";
import { supabase } from "@communalapp/config/supabase-client";
import { fetchUserCommunities } from ".";
import { PostInterface } from "@communalapp/app/(application)/components/sections/posts-feed";

export async function postForCommunity(communityName: string, content: string) {
  const user = await currentUser();
  const { data, error } = await supabase
  .from('posts')
  .insert([
    {
      "content": content,
      "community_name": communityName,
      "username": user?.username,
      "profile_picture": user?.imageUrl
    }
  ])
    .select()
}

export async function fetchCommunityPosts(communityName: string): Promise<PostInterface[] & any[]> {
  let { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('community_name', communityName);
  
  return posts || [];
}

export async function createFeed(): Promise<PostInterface[] & any> {
  const userCommunities = await fetchUserCommunities();
  const communityNameList = userCommunities.map((community) => community.communityName);

  let feedContentPreload: PostInterface[] & any = [];

  await Promise.all(
    communityNameList.map(async (communityName) => {
      const communityPostsResponse = await fetchCommunityPosts(communityName);
      if (communityPostsResponse?.length > 0) {
        feedContentPreload.push(...communityPostsResponse);
      }
    })
  );

  console.log(feedContentPreload);

  return feedContentPreload;
}