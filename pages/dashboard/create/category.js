import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import { FormCategory } from "../../../form";
import { Box, Heading } from "@chakra-ui/react";

export default function DashboardCreateCategory() {
  return (
    <div>
      <Head>
        <title>E-ROR | SuperAdmin Create Account</title>
      </Head>
      <DashboardLayout>
        <Box p="14">
          <Box
            p="10"
            borderRadius="lg"
            boxShadow="2xl"
            _hover={{ boxShadow: "dark-lg" }}
          >
            <Heading fontSize="2.1em">Create Category</Heading>
            <FormCategory />
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
