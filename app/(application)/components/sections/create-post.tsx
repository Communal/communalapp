'use client';
import {
  UserType,
  fetchUserCommunities,
  getUserData,
  postForCommunity,
} from '@communalapp/scripts';
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  Heading,
  Subtitle,
} from 'craftbook';
import { ChevronDown } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { CommunityCardProps } from '../community-card';
import { UserButton } from '@clerk/nextjs';

export default function CreatePost() {
  const [userCommunities, setUserCommunities] = useState<
    Array<
      Pick<CommunityCardProps, 'title'> &
        Pick<CommunityCardProps, 'communityName'> &
        Pick<CommunityCardProps, 'logo'>
    >
  >([]);

  const [selectedCommunity, setSelectedCommunity] = useState<
    Pick<CommunityCardProps, 'logo'> &
      Pick<CommunityCardProps, 'title'> &
      Pick<CommunityCardProps, 'communityName'>
  >({
    logo: '',
    title: '',
    communityName: '',
  });

  const [content, setContent] = useState<string>('');
  const [userData, setUserData] = useState<UserType>();

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData();
      setUserData(JSON.parse(user));
    }
    fetchUserData();
  }, []);

  const autoResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(textarea.value);
  };

  useEffect(() => {
    async function fetchCommunitiesData() {
      const response = await fetchUserCommunities();
      setUserCommunities(response);
    }
    fetchCommunitiesData();
  }, []);

  return (
    <Box className="border-b">
      <Box id="post-content-input-wrapper" className="p-6">
        <Flex alignItems="start">
          <Avatar
            fallback={userData?.firstName[0] as string}
            image={userData?.profilePicture}
            size="sm"
            className="*:scale-125"
          />
          <textarea
            id="post-input"
            className="bg-transparent focus:outline-none w-full min-h-[40px] resize-none mt-2"
            placeholder="What is happening?! Share with your communities"
            onChange={autoResize}
            value={content}
          />
        </Flex>
      </Box>
      <Flex justifyContent="between" className="border-t px-4 py-3">
        {content ? (
          <Button variant="outline" size="sm" onClick={() => setContent('')}>
            Discard
          </Button>
        ) : (
          <Box />
        )}
        <Flex alignItems="center" justifyContent="end">
          {content && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  {selectedCommunity.title ? (
                    <>
                      <Flex gap={6}>
                        <Avatar
                          fallback={selectedCommunity.title[0]}
                          image={selectedCommunity.logo}
                          size="sm"
                          className="w-4 h-4 text-xs"
                        />
                        <Subtitle>{selectedCommunity.title}</Subtitle>
                      </Flex>
                    </>
                  ) : (
                    'Select community'
                  )}{' '}
                  <ChevronDown className="w-3 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                {userCommunities.map((community, index: number) => {
                  return (
                    <DropdownMenuItem
                      key={index}
                      onClick={() =>
                        setSelectedCommunity({
                          logo: community.logo,
                          title: community.title,
                          communityName: community.communityName,
                        })
                      }>
                      <Flex>
                        <Avatar
                          fallback={community.title[0]}
                          image={community.logo}
                          size="sm"
                          className="w-4 h-4 text-xs"
                        />
                        <Subtitle>{community.title}</Subtitle>
                      </Flex>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            size="sm"
            variant="primary"
            disabled={!selectedCommunity.title}
            onClick={() => {
              postForCommunity(selectedCommunity.communityName, content);
              // resting post content
              setContent('');
              setSelectedCommunity({
                logo: '',
                title: '',
                communityName: '',
              });
            }}>
            Post
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
