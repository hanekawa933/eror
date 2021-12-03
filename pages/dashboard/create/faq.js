import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import { FormFaq } from "../../../form";
import { Box, Heading } from "@chakra-ui/react";

export default function DashboardCreateFaq() {
  return (
    <div>
      <Head>
        <title>E-ROR | Buat FAQ</title>
      </Head>
      <DashboardLayout>
        <Box pb="10" px="5">
          <Box p="10" borderRadius="lg" boxShadow="lg">
            <Heading fontSize="2.1em">Buat FAQ</Heading>
            <FormFaq />
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
