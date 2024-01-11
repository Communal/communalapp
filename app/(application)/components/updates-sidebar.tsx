import { Box, Card, Heading, Subtitle } from "craftbook";
import Link from "next/link";
import { CommunityRecommendations } from "./sections/community-recommendations";

export default function UpdatesSidebar() {
  return (
    <div className="updates-sidebar border-l h-screen sticky w-96 top-0 p-6 mt-1.5">
      <Heading size="md">Trending Updates</Heading>
      <Subtitle size="xs">
        Showing updates matching with your interests. <Link href={"#"} className="communalTextLink">Manage what you see</Link>
      </Subtitle>
      <Card className="w-full mt-4 h-64" />
      <Box className="community-recommendations-wrapper mt-6">
        <CommunityRecommendations />
      </Box>
    </div>
  )
}