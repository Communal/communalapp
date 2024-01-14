"use client";
import { Avatar, Body, Box, Button, Card, Flex, Heading, Input, Stack, Subtitle } from "craftbook";
import { useContext, useState } from "react";
import { createContext } from "react";
import { motion } from "framer-motion";
import { uploadCommunityLogo } from "@communalapp/scripts/uploads";
import { createCommunity } from "@communalapp/scripts";

type CreateCommunityFormDataType = {
  communityName: string;
  title: string;
  description: string;
  imageURL?: string;
  invites?: string[];
}

const INITIAL_COMMUNITY_FORM_DATA: CreateCommunityFormDataType = {
  communityName: "",
  title: "",
  description: "",
  imageURL: "",
  invites: []
}

interface CreateCommunityFormContextInterface {
  newCommunityData: CreateCommunityFormDataType;
  setNewCommunityData: (data: CreateCommunityFormDataType) => void;
}

const CreateCommunityFormContext = createContext<CreateCommunityFormContextInterface>({
  newCommunityData: INITIAL_COMMUNITY_FORM_DATA,
  setNewCommunityData: () => { }
});

export default function CreateCommunity() {
  const [flow, setFlow] =
    useState<"community-details" | "image-upload" | "invite">("community-details");
  const [newCommunityData, setNewCommunityData] =
    useState<CreateCommunityFormDataType>(INITIAL_COMMUNITY_FORM_DATA);

  return (
    <Box className="flex flex-row items-center justify-center h-screen">
      <CreateCommunityFormContext.Provider value={{ newCommunityData, setNewCommunityData }}>
        <Card className="w-[600px] max-md:w-[80%]">
          <Heading size="lg">
            {flow === "community-details" && "Creating a new community"}
            {flow == "image-upload" && "Upload a profile image for your community"}
            {flow === "invite" && "Invite friends & members"}
          </Heading>
          <Subtitle size="sm">
            {flow === "community-details" && "You cannot the community name later. Only community Title and Description are editable."}
            {flow === "image-upload" && "Recommended image size is between 200x200 to 1000x1000"}
            {flow === "invite" && ""}
          </Subtitle>
          {flow === "community-details" && <CommunityDetailsTab />}
          {flow === "image-upload" && <LogoUploadTab />}
          <Flex alignItems="center" justifyContent="center" className="my-12">
            {flow === "community-details" && <Button
              variant="solid"
              size="sm"
              onClick={() => setFlow("image-upload")}
              disabled={!newCommunityData.title || !newCommunityData.communityName}
            >
              Save & Upload Logo
            </Button>}
            {flow === "image-upload" && <>
              <Button variant="outline" size="sm" onClick={() => setFlow("community-details")}>
                {"Back to community details"}
              </Button>
              <Button variant="secondary" size="sm" onClick={async () => {
                if (await createCommunity(
                  newCommunityData.communityName,
                  newCommunityData.title,
                  newCommunityData.description,
                  newCommunityData.imageURL,
                  "Tech & Science"
                )) {
                  window.location.href = "/home";
                } else {
                  alert("Error while creating community");
                }
              }}>
                Create Community
              </Button>
            </>}
          </Flex>
        </Card>
      </CreateCommunityFormContext.Provider>
    </Box >
  )
}

function CommunityDetailsTab() {
  const { newCommunityData, setNewCommunityData } = useContext(CreateCommunityFormContext);
  return (
    <motion.div
      initial={{
        x: -12,
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      transition={{
        type: "just"
      }}
    >
      <Stack className="my-10">
        <Flex direction="column" alignItems="start">
          <label className="text-sm font-medium" htmlFor="title">
            {"Display Title"}
          </label>
          <Input
            name="title"
            autoFocus
            className="w-full"
            placeholder="eg: Cupcake Engineers"
            value={newCommunityData.title}
            onChange={(e) => setNewCommunityData({
              ...newCommunityData,
              title: e.target.value as string
            })}
          />
        </Flex>
        <Flex direction="column" alignItems="start">
          <label className="text-sm font-medium" htmlFor="community-name">
            {"Community Name"}
          </label>
          <Input
            name="community-name"
            autoFocus
            className="w-full"
            placeholder="eg: cupcake-engineers"
            value={newCommunityData.communityName}
            onChange={(e) => setNewCommunityData({
              ...newCommunityData,
              communityName: e.target.value as string
            })}
          />
        </Flex>
        <Flex direction="column" alignItems="start">
          <label className="text-sm font-medium" htmlFor="description">
            {"Description"}
          </label>
          <Input
            name="description"
            autoFocus
            className="w-full"
            placeholder="Your community description"
            value={newCommunityData.description}
            onChange={(e) => setNewCommunityData({
              ...newCommunityData,
              description: e.target.value as string
            })}
          />
        </Flex>
      </Stack>
    </motion.div>
  )
}

function LogoUploadTab() {
  const { newCommunityData, setNewCommunityData } = useContext(CreateCommunityFormContext);
  return (
    <motion.div
      initial={{
        x: 12,
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      transition={{
        type: "just"
      }}
    >
      <Box className="my-12">
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Avatar fallback={newCommunityData.title[0]} size="lg" image={newCommunityData.imageURL} />
          <Body>{newCommunityData.title}</Body>
        </Flex>
        <Input type="file" onChange={async (e) => {
          let imageUploadPath = await uploadCommunityLogo(e);
          setNewCommunityData({
            ...newCommunityData,
            imageURL: imageUploadPath
          })
        }} />
      </Box>
    </motion.div>
  )
}