"use client";
import { useClerk } from "@clerk/nextjs";
import { UserType, fetchUserCommunities, getUserData } from "@communalapp/scripts";
import { Avatar, Box, Button, LinkButton, SidebarOption, Stack } from "craftbook";
import { Home, Search, User, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Sidebar() {
  const ApplicationSidebarOptions = [
    { name: "Home", icon: <Home className="w-4 h-4" />, path: "/home" },
    { name: "Explore", icon: <Search className="w-4 h-4" />, path: "/explore" },
  ];

  const [userCommunities, setUserCommunities] = useState<any>([]);

  const [allCommunityOpen, setAllCommunityOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCommunitiesData() {
      const response = await fetchUserCommunities();
      setUserCommunities(response);
    }
    fetchCommunitiesData();
  }, []);

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
          <SidebarOption className="truncate" onClick={() => setAllCommunityOpen(!allCommunityOpen)}>
            <Users className="w-4 h-4" />
            All Communities
          </SidebarOption>
          {(userCommunities.length && allCommunityOpen) ? <AnimatePresence>
            <Box className="w-full">
              {userCommunities.map((communityOption: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -(12 * (index + 1))
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    transition={{
                      type: "just"
                    }}
                  >
                    <Link href={`/comm/${communityOption.communityName}`} className="w-full">
                      <LinkButton className="w-full justify-start rounded-lg truncate px-2">
                        {communityOption.title}
                      </LinkButton>
                    </Link>
                  </motion.div>
                )
              })}
            </Box>
          </AnimatePresence> : <></>}
          <Button className="rounded-full mt-2">
            {"Post"}
          </Button>
        </Stack>
      </nav>
      <Stack>
        <UserAccountActions />
      </Stack>
    </Box >
  )
}

function UserAccountActions() {
  const [userData, setUserData] = useState<UserType>();
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData();
      setUserData(JSON.parse(user));
    }
    fetchUserData();
  }, []);

  return (
    <UserButton afterSignOutUrl="/sign-in" />
  )
}