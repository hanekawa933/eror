import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import CardHistoryReport from "../../../components/CardHistoryReport";
import { Box, Grid, useColorMode } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export default function ReportHistory() {
  return (
    <div>
      <Head>
        <title>E-ROR | SuperAdmin Create Account</title>
      </Head>
      <DashboardLayout>
        <Box px="14" pb="14">
          <Box
            p="10"
            borderRadius="lg"
            boxShadow="2xl"
            _hover={{ boxShadow: "dark-lg" }}
          >
            <Box display="flex" alignItems="center" fontWeight="semibold">
              <Icon
                icon="bi:clock-history"
                width={16 * 2.2}
                height={16 * 2.2}
                color={useColorMode().colorMode === "dark" ? "white" : "black"}
              />
              <Box as="span" fontSize="2.2em" ml="3">
                History Laporan
              </Box>
            </Box>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="5">
                <CardHistoryReport
                  lokasi="Jl. Kebugisan Selatan"
                  laporan="Pintu sulit dibuka"
                  waktu="3 hari yang lalu"
                  status="On-Progress"
                  image="/assets/img/pintu.jpg"
                />
                <CardHistoryReport
                  lokasi="Jl. Kebugisan Selatan"
                  laporan="Pintu sulit dibuka"
                  waktu="3 hari yang lalu"
                  status="On-Progress"
                  image="/assets/img/pintu.jpg"
                />
                <CardHistoryReport
                  lokasi="Jl. Kebugisan Selatan"
                  laporan="Pintu sulit dibuka"
                  waktu="3 hari yang lalu"
                  status="On-Progress"
                  image="/assets/img/pintu.jpg"
                />
              </Grid>
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
