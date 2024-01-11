"use client";
import { Suspense, useEffect, useState } from "react";
import { CommunityRecommendations } from "../components/sections/community-recommendations";
import { checkIfUserHasCommunities } from "@communalapp/scripts";
import { NoCommunitiesActions } from "../components/sections/no-communities-actions";

export default function HomeView() {
  const [userHasCommunities, setUserHasCommunities] = useState<boolean>();

  useEffect(() => {
    async function checkResponse() {
      setUserHasCommunities(await checkIfUserHasCommunities());
    }
    checkResponse();
  }, []);
  return (
    <>
      <Suspense>
        {!userHasCommunities && <NoCommunitiesActions />}
      </Suspense >
    </>
  )
}