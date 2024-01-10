import { currentUser } from "@clerk/nextjs"
import { Body, Box, Button, Flex, ViewContainer } from "craftbook"
import Link from "next/link"
import { ChevronRight } from 'lucide-react';

const Navbar: React.FunctionComponent = async () => {
  const user = await currentUser();
  return (
    <nav className="border-b py-2 px-4">
      <ViewContainer>
        <Flex justifyContent="between" alignItems="center">
          <Box>
            <Link href={"/"}>
              <Flex gap={6}>
                <Box className="w-3 h-3 bg-product-dark rounded-full" />
                <Body>{"communal"}</Body>
              </Flex>
            </Link>
          </Box>
          {!user && <Flex id="logged-out-options">
            <Link href={"/sign-up"}>
              <Button variant="solid" size="sm">
                {"Create a communal"}
              </Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button variant="outline" size="sm">
                {"Login"}
              </Button>
            </Link>
          </Flex>}
          {user && <Flex id="logged-in-options">
            <Link href={"/home"}>
              <Button size="sm" icon={<ChevronRight className="w-4 h-4" />} iconDirection="right" variant="secondary">
                {"Open Communal"}
              </Button>
            </Link>
          </Flex>}
        </Flex>
      </ViewContainer>
    </nav>
  )
}

export {
  Navbar
}