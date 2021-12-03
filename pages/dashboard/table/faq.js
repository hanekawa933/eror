import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import { TableFaq } from "../../../tables";
import { Box, Heading } from "@chakra-ui/react";

export default function DashboardTableAccount() {
  return (
    <div>
      <Head>
        <title>E-ROR | Tabel Data FAQ</title>
      </Head>
      <DashboardLayout>
        <Box p="14">
          <Box
            p="10"
            borderRadius="lg"
            boxShadow="2xl"
            _hover={{ boxShadow: "dark-lg" }}
          >
            <Heading fontSize="2.1em">Tabel FAQ</Heading>
            <TableFaq />
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
