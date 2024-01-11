import { CommunityCardProps } from "@communalapp/app/(application)/components/community-card";
import { supabase } from "@communalapp/config/supabase-client";

export async function fetchAllCommunities() {
  const { data: communities, error } = await supabase
    .from('communities').select('*')
  
  if (!communities || error) {
    console.error("Error while fetching all communities for user", error);
    return [];
  } else {
    let response: CommunityCardProps[] = [];
    communities.map((community) => {
      response.push({
        title: community["title"],
        communityName: community["community_name"],
        id: community["id"],
        description: community["description"],
        users: community["users"] || [],
        category: community["category"],
      });
    });

    return response;
  }
}

export async function fetchCommunityRecommendations() {
  const { data: communities, error } = await supabase
    .from('communities').select('*')
  
  if (!communities || error) {
    console.error("Error while fetching all communities for user", error);
    return [];
  } else {
    let response: CommunityCardProps[] = [];
    communities.map((community) => {
      response.push({
        title: community["title"],
        communityName: community["community_name"],
        id: community["id"],
        description: community["description"],
        users: community["users"] || [],
        category: community["category"],
      });
    });

    if (response.length <= 2) {
      return response
    } else {
      return response.slice(0, 2);
    }
  }
}