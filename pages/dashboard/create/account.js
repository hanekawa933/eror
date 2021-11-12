import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import { FormUser, FormSuperadmin } from "../../../form";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function DashboardCreateAccount() {
  return (
    <div>
      <Head>
        <title>E-ROR | SuperAdmin Create Account</title>
      </Head>
      <DashboardLayout>
        <Box p="10">
          <Tabs variant="soft-rounded" colorScheme="gray">
            <TabList px="7">
              <Tab>Create SuperAdmin</Tab>
              <Tab ml="3">Create User</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box
                  p="10"
                  borderRadius="lg"
                  boxShadow="2xl"
                  _hover={{ boxShadow: "dark-lg" }}
                >
                  <Heading fontSize="2.1em">Create SuperAdmin</Heading>
                  <FormSuperadmin />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  p="10"
                  borderRadius="lg"
                  boxShadow="2xl"
                  _hover={{ boxShadow: "dark-lg" }}
                >
                  <Heading>Create User</Heading>
                  <FormUser />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </DashboardLayout>
    </div>
  );
}
