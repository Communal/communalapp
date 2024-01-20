"use server";
import { currentUser } from "@clerk/nextjs";
import { CommunityCardProps } from "@communalapp/app/(application)/components/community-card";
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
  
  console.log("error while adding user", error);
  console.log("data after adding user", data);
}

export async function fetchUserCommunities(): Promise<Array<
  Pick<CommunityCardProps, 'title'> 
  & Pick<CommunityCardProps, 'communityName'>
  & Pick<CommunityCardProps, 'logo'>
  >> {
  const user = await currentUser();

  return await supabase
    .from('communities')
    .select('*')
    .then(({ data: communities, error }) => {
      if (error) {
        console.error("Error fetching user communities:", error);
        return [];
      }

      // Filter the communities based on the condition
      const filteredCommunities = communities.filter(community =>
        community.users ? user?.username === community.users[0]?.username : Boolean(null) 
      );

      console.log("Fetched user communities:", filteredCommunities);

      return filteredCommunities.map((community) => {
        return {
          title: community["title"],
          communityName: community["community_name"],
          logo: community["logo"]
        }
      })
  })
}