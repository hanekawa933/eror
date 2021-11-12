import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import { TableCategory } from "../../../tables";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function DashboardTableCategory() {
  return (
    <div>
      <Head>
        <title>E-ROR | SuperAdmin Table Data Category</title>
      </Head>
      <DashboardLayout>
        <Box p="10">
          <Box
            p="10"
            borderRadius="lg"
            boxShadow="2xl"
            _hover={{ boxShadow: "dark-lg" }}
          >
            <Heading fontSize="2.1em">Table Category</Heading>
            <TableCategory />
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
