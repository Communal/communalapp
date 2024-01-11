import { UserType, getUserData } from "@communalapp/scripts";
import { Avatar, Body, Box, Button, Flex, LinkButton, SidebarOption, Stack, Subtitle } from "craftbook";
import { Home, Search, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const ApplicationSidebarOptions = [
    { name: "Home", icon: <Home className="w-4 h-4" />, path: "/home" },
    { name: "Explore", icon: <Search className="w-4 h-4" />, path: "/explore" },
  ];

  return (
    <Box className="sidebar border-r h-screen fixed w-48 pr-4 py-4 flex flex-col items-stretch justify-between">
      <nav className="sidebar-options-list">
        <Stack rowGap={6}>
          {ApplicationSidebarOptions.map((option, index) => {
            return (
              <Link href={option.path} key={index}>
                <SidebarOption>
                  {option.icon}
                  <span>{option.name}</span>
                </SidebarOption>
              </Link>
            )
          })}
          <Link href={`/`}>
            <SidebarOption>
              <User className="w-4 h-4" />
              <span>{"Profile"}</span>
            </SidebarOption>
          </Link>
          <Button className="rounded-full mt-2">
            {"Post"}
          </Button>
        </Stack>
      </nav>
      <Stack>
        <UserAccountActions />
      </Stack>
    </Box>
  )
}

function UserAccountActions() {
  const [userData, setUserData] = useState<UserType>();

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData();
      setUserData(JSON.parse(user));
    }
    fetchUserData();
  }, []);

  return (
    <LinkButton className="gap-2 px-2 pr-6">
      <Avatar
        fallback={userData?.firstName ? userData.firstName[0] : ""}
        image={userData?.profilePicture}
        size="sm"
      />
      <Flex direction="column" gap={1} alignItems="start">
        <Body size="sm">
          {userData?.firstName} {userData?.lastName || ""}
        </Body>
        <Subtitle size="xs">@{userData?.username}</Subtitle>
      </Flex>
    </LinkButton>
  )
}