import { currentUser } from "@clerk/nextjs";
import { Box, Button, Flex, Headline, SectionContainer, ViewContainer, Card } from "craftbook";
import Link from "next/link";

const HeroSection: React.FunctionComponent = async () => {
  const user = await currentUser();
  return (
    <SectionContainer className="py-20">
      <ViewContainer>
        <Flex alignItems="center" direction="column" gap={24}>
          <Headline size="lg" className="text-center leading-snug font-medium">
            {"Elevating your CommX"}
          </Headline>
          {!user && <Flex>
            <Button variant="primary">
              {"Join Communal"}
            </Button>
            <Link href={"/explore"}>
              <Button variant="outline">
                {"Explore Communities"}
              </Button>
            </Link>
          </Flex>}
          {user && <Flex>
            <Link href={`/@${user.username}`}>
              <Button variant="solid">{"Go to profile"}</Button>
            </Link>
            <Link href={"/explore"}>
              <Button variant="outline">{"Explore communities"}</Button>
            </Link>
          </Flex>}
          <Card className="w-2/3 h-[400px] z-10 mt-12" />
        </Flex>
      </ViewContainer>
      <Box className="bg-product-dark/30 w-[400px] h-[400px] blur-[100px] absolute bottom-0 left-1/3 animate-pulse" />
    </SectionContainer>
  )
}

export {
  HeroSection
}