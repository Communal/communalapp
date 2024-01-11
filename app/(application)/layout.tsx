"use client";
import { Flex, Stack, ViewContainer } from "craftbook";
import Sidebar from "./components/sidebar";
import UpdatesSidebar from "./components/updates-sidebar";

export default function Application({ children }: { children: React.ReactNode }) {
  return (
    <ViewContainer className="application-layout-container">
      <Sidebar />
      <Flex gap={0} alignItems="start">
        <Stack className="ml-48 w-[800px]" alignItems="start">
          {children}
        </Stack>
        <UpdatesSidebar />
      </Flex>
    </ViewContainer>
  );
}