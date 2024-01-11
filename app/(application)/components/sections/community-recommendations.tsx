import { fetchAllCommunities, fetchCommunityRecommendations } from "@communalapp/scripts";
import { Box, Flex, Heading, Stack } from "craftbook";
import { Suspense, useEffect, useState } from "react";
import CommunityCard, { CommunityCardProps } from "../community-card";
import { unstable_noStore } from "next/cache";

export function CommunityRecommendations() {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="between">
        <Heading size="md">{"Recommended communities to join"}</Heading>
      </Flex>
      <Stack className="mt-4 w-fit" justifyContent="start">
        <Suspense fallback={"Loading..."}>
          <CommunityRecommendationGrid />
        </Suspense>
      </Stack>
    </Box>
  )
}

function CommunityRecommendationGrid() {
  const [communities, setCommunities] = useState<CommunityCardProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      unstable_noStore();
      const response = await fetchCommunityRecommendations();
      setCommunities(response);
    }
    fetchData();
  }, []);

  return (
    <>
      {communities.map((community, index) => {
        return (
          <CommunityCard
            title={community.title}
            id={community.id}
            communityName={community.communityName}
            description={community.description}
            users={community.users}
            category={community.category}
            key={index}
          />
        )
      })}
    </>
  )
}