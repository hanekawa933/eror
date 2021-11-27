import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import { TableUserAccount } from "../../../tables";
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
        <Box p="14">
          <Box
            p="10"
            borderRadius="lg"
            boxShadow="2xl"
            _hover={{ boxShadow: "dark-lg" }}
          >
            <Heading fontSize="2.1em">Create User</Heading>
            <TableUserAccount />
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
