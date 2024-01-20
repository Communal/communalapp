'use client';
import { communityCategories } from '@communalapp/common/consts';
import { ApplicationContent } from '@communalapp/common/copy';
import { fetchAllCategories, addNewUser } from '@communalapp/scripts';
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Headline,
  LinkButton,
  Option,
  Subtitle,
} from 'craftbook';
import { useEffect, useState } from 'react';

export default function OnboardingFlow() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategorySelection = (category: string) => {
    if (selectedCategories.includes(category)) {
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <Box className="h-screen flex flex-row items-center justify-center w-full">
      <Card className="w-[40%] max-xl:w-[60%] max-md:w-[80%]">
        <Headline size="sm" className="text-center">
          {ApplicationContent.Onboarding.title}
        </Headline>
        <Subtitle size="sm" className="text-center">
          {ApplicationContent.Onboarding.subtitle}
        </Subtitle>
        <Box className="my-12 grid grid-cols-2 max-md:grid-cols-1 gap-2 max-lg:overflow-y-scroll max-lg:h-[400px]">
          {communityCategories.map((category, index) => {
            return (
              <Option
                key={index}
                onClick={() => handleCategorySelection(category)}>
                {category}
              </Option>
            );
          })}
        </Box>
        <Flex direction="column">
          <Button
            variant="secondary"
            onClick={() => {
              addNewUser({ interests: selectedCategories });
              window.location.href = '/home';
            }}>
            Continue
          </Button>
          <LinkButton
            onClick={() => {
              addNewUser({ interests: [] });
              window.location.href = '/home';
            }}>
            {'Do this later'}
          </LinkButton>
        </Flex>
      </Card>
    </Box>
  );
}
