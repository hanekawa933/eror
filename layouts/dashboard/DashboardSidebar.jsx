import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Radio,
  Avatar,
  Text,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import NavSection from "./NavSection";

const DashboardSidebar = () => {
  return (
    <Box
      w="280px"
      minH="100%"
      borderRight="2px"
      borderColor="gray.200"
      display={["none", "none", "none", "none", "inline", "inline"]}
      pb="10"
    >
      <Flex pt="5" px="5">
        <Link href="/dashboard/home">Disini Logo</Link>
        <Spacer />
        <Radio />
      </Flex>
      <Box my="7" mx="5" bg="gray.100" borderRadius="md" py="4" px="7">
        <Flex>
          <Avatar size="md" name="Avatar" src="/assets/img/photo_profile.png" />
          <Box mx="5">
            <Heading fontSize="md">Username</Heading>
            <Text fontSize="sm" color="gray.500">
              Administrator
            </Text>
          </Box>
        </Flex>
      </Box>
      <NavSection />
    </Box>
  );
};

export default DashboardSidebar;
