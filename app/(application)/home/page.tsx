"use client";
import { Suspense, useEffect, useState } from "react";
import { checkIfUserHasCommunities } from "@communalapp/scripts";
import { NoCommunitiesActions } from "../components/sections/no-communities-actions";
import CreatePost from "../components/sections/create-post";
import { PostsFeed } from "../components/sections/posts-feed";

export default function HomeView() {
  const [userHasCommunities, setUserHasCommunities] = useState<boolean>(true);

  useEffect(() => {
    async function checkResponse() {
      setUserHasCommunities(await checkIfUserHasCommunities());
    }
    checkResponse();
  }, []);

  return (
    <>
      <Suspense>
        {userHasCommunities && <CreatePost />}
        {!userHasCommunities && <NoCommunitiesActions />}
        <PostsFeed />
      </Suspense>
    </>
  )
}