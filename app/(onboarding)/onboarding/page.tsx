"use client";
import { ApplicationContent } from "@communalapp/common/copy";
import { fetchAllCategories, addNewUser } from "@communalapp/scripts";
import { Box, Button, Card, Grid, Headline, LinkButton, Subtitle } from "craftbook";
import { useEffect, useState } from "react";

export default function OnboardingFlow() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchAllCategories();
      setCategories(response);
    }
    fetchData();
  }, []);

  return (
    <Box className="h-screen flex flex-row items-center justify-center w-full">
      <Card className="w-[40%] max-xl:w-[60%] max-md:w-[80%]">
        <Headline size="sm" className="text-center">
          {ApplicationContent.Onboarding.title}
        </Headline>
        <Subtitle size="sm" className="text-center">
          {ApplicationContent.Onboarding.subtitle}
        </Subtitle>
        <Grid className="my-12" cols={2}>
          {categories.map((category, index) => {
            return (
              <Button variant="outline" key={index}>
                {category}
              </Button>
            )
          })}
        </Grid>
        <Box className="flex flex-row items-center justify-center">
          <LinkButton onClick={() => {
            addNewUser({ interests: [categories[0]] });
            window.location.href = "/home";
          }}>
            {"Do this later"}
          </LinkButton>
        </Box>
      </Card>
    </Box>
  )
}