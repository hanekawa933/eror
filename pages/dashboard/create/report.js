import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import { FormReport } from "../../../form";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function DashboardCreateReport() {
  return (
    <div>
      <Head>
        <title>E-ROR | SuperAdmin Create Account</title>
      </Head>
      <DashboardLayout>
        <Box p="14">
          <Box
            p="10"
            background="gray.700"
            borderRadius="lg"
            boxShadow="2xl"
            _hover={{ boxShadow: "dark-lg" }}
          >
            <Heading fontSize="2.1em">Create Report</Heading>
            <FormReport />
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
