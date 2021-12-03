import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import { FormUser } from "../../../form";
import { Box, Heading } from "@chakra-ui/react";

export default function DashboardCreateAccount() {
  return (
    <div>
      <Head>
        <title>E-ROR | SuperAdmin Buat Akun User</title>
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
            <FormUser />
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
