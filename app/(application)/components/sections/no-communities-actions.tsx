import { ApplicationContent } from "@communalapp/common/copy";
import { Body, Box, Button, Card, Grid, Heading, Subtitle } from "craftbook";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export function NoCommunitiesActions() {
  return (
    <Box className="border-b p-6">
      <Heading size="lg">
        {ApplicationContent.Home.NoCommunity.title}
      </Heading>
      <Subtitle size="xs">
        {ApplicationContent.Home.NoCommunity.subtitle}
      </Subtitle>
      <Grid className="mt-4" cols={2}>
        <Card>
          <Heading size="md">
            {ApplicationContent.Home.NoCommunity.Action.CreateCommunity.title}
          </Heading>
          <Subtitle size="xs" className="mt-2 pb-2">
            {ApplicationContent.Home.NoCommunity.Action.CreateCommunity.subtitle}
          </Subtitle>
          <Link href={"/create-community"}>
            <Button size="sm" variant="outline" strech>
              Create community
            </Button>
          </Link>
        </Card>
        <Card className="!bg-product-secondary h-full">
          <Body size="lg" className="!text-white">
            {"See what's trending on Communal"}
          </Body>
          <Link href={"/explore?tab=trending"} className="mt-2 block">
            <Subtitle size="sm" className="!text-white flex flex-row items-center gap-1 hover:gap-2 transition-all">
              Explore Trending <ChevronRight className="w-4 h-4" />
            </Subtitle>
          </Link>
        </Card>
      </Grid>
    </Box >
  )
}