'use client';
import { Flex, Stack, ViewContainer } from 'craftbook';
import Sidebar from './components/sidebar';
import UpdatesSidebar from './components/updates-sidebar';
import NextTopLoader from 'nextjs-toploader';

export default function Application({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextTopLoader showSpinner={false} height={3} color="black" />
      <ViewContainer className="application-layout-container">
        <Sidebar />
        <Flex gap={0} alignItems="start">
          <Stack className="ml-48 w-[800px]" alignItems="start" rowGap={0}>
            {children}
          </Stack>
          <UpdatesSidebar />
        </Flex>
      </ViewContainer>
    </>
  );
}
