import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import { TableUserAccount, TableSuperAdminAccount } from "../../../tables";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function DashboardTableAccount() {
  return (
    <div>
      <Head>
        <title>E-ROR | SuperAdmin Table Data Account</title>
      </Head>
      <DashboardLayout>
        <Box p="10">
          <Tabs variant="soft-rounded" colorScheme="gray">
            <TabList px="7">
              <Tab>Table SuperAdmin</Tab>
              <Tab ml="3">Table User</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box
                  p="10"
                  background="gray.700"
                  borderRadius="lg"
                  boxShadow="2xl"
                  _hover={{ boxShadow: "dark-lg" }}
                >
                  <Heading fontSize="2.1em">Table SuperAdmin</Heading>
                  <TableSuperAdminAccount />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  p="10"
                  background="gray.700"
                  borderRadius="lg"
                  boxShadow="2xl"
                  _hover={{ boxShadow: "dark-lg" }}
                >
                  <Heading>Table User</Heading>
                  <TableUserAccount />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </DashboardLayout>
    </div>
  );
}
