'use client';
import {
  checkIfPartOfCommunity,
  checkUserIfAdmin,
  followCommunity,
  getCommunityData,
} from '@communalapp/scripts';
import {
  Avatar,
  Box,
  Button,
  Flex,
  FollowButton,
  Grid,
  Headline,
  IconLinkButton,
  Stack,
  Subtitle,
  TabMenu,
  UppercaseHeading,
} from 'craftbook';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommunityTimeline from './components/sections/community-timeline';

export type CommunityPageType = {
  communityName: string;
  title: string;
  logo: string;
  users?: any[];
  description?: string;
  category: string;
};

export default function CommunityPage({
  params,
}: {
  params: { slug: string };
}) {
  const communityNameQuery = params.slug;
  const [communityData, setCommunityData] = useState<CommunityPageType>({
    communityName: '',
    title: '',
    logo: '',
    users: [],
    description: '',
    category: '',
  });

  const [notFound, setNotFound] = useState<boolean>(false);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [isUserMember, setIsUserMember] = useState<boolean>(false);

  const [tab, setTab] = useState('timeline');

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await getCommunityData(communityNameQuery);
      if (response === false) {
        setNotFound(true);
      } else {
        setCommunityData({ ...response });
        setIsUserAdmin((await checkUserIfAdmin(response.users)) as boolean);
        setIsUserMember(
          (await checkIfPartOfCommunity(response.users)) as boolean,
        );
      }
    }
    fetchData();
  }, []);

  return (
    <Stack>
      <Box className="border-b p-3">
        <IconLinkButton
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4" />
        </IconLinkButton>
      </Box>
      {communityData?.title && !notFound && (
        <Box id="community-profile-header" className="p-6 border-b">
          <Flex direction="column">
            <Avatar
              fallback={communityData?.title[0]}
              size="lg"
              image={communityData?.logo}
            />
            <Flex direction="column">
              <Headline size="sm">{communityData.title}</Headline>
              <Subtitle size="md" className="text-center">
                {communityData.description}
              </Subtitle>
            </Flex>
            <Grid className="my-6" cols={2} justifyContent="center" colGap={24}>
              <Flex className="w-fit" direction="column" gap={2}>
                <UppercaseHeading>{'members'}</UppercaseHeading>
                <Subtitle size="sm">{communityData?.users?.length}</Subtitle>
              </Flex>
              <Flex className="w-fit" direction="column" gap={2}>
                <UppercaseHeading>{'category'}</UppercaseHeading>
                <Subtitle size="sm">{communityData?.category}</Subtitle>
              </Flex>
            </Grid>
            <Box>
              {isUserAdmin ? (
                <Subtitle size="xs">
                  {"You're the admin of this community"}
                </Subtitle>
              ) : (
                <>
                  <FollowButton
                    onFollow={() =>
                      followCommunity(communityData.communityName)
                    }
                    onUnfollow={() => { }}
                    isFollowing={isUserMember}
                  />
                </>
              )}
            </Box>
          </Flex>
        </Box>
      )}
      <TabMenu
        options={['timeline', 'initiatives', 'members', 'calendar']}
        currentOption="timeline"
        stretch
        updateSelection={setTab}
      />
      {communityData.communityName && tab === 'timeline' && (
        <CommunityTimeline communityName={communityData.communityName} />
      )}
    </Stack>
  );
}
