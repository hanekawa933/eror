import Head from "next/head";
import DashboardLayout from "../../../../../layouts/dashboard";
import { FormTechnicianReport } from "../../../../../form";
import { Box, Grid, Image, Text, Badge } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export default function CreateUserReport() {
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
              <Icon icon="carbon:report" width={16 * 2.2} height={16 * 2.2} />
              <Box as="span" fontSize="2.2em" ml="3">
                Validasi Laporan
              </Box>
            </Box>
            <Box display="flex" flexDir="column">
              <Box display="flex" flexDir="column" width="max-content" py="5">
                <Box as="span" fontWeight="semibold" textTransform="capitalize">
                  Kode Laporan
                </Box>
                <Text fontSize="1.4em" fontWeight="bold">
                  #RP-BG-61232
                </Text>
              </Box>
            </Box>
            <Box display="flex" flexDir="column" mt="3">
              <Box as="span" fontWeight="semibold" textTransform="capitalize">
                Jenis Kerusakan
              </Box>
              <Box as="p">AC tidak dingin</Box>
            </Box>
            <Box display="flex" flexDir="column" mt="3">
              <Box as="span" fontWeight="semibold" textTransform="capitalize">
                Lokasi
              </Box>
              <Box as="p">
                Kantor Kementerian Sekretariat Negara, Jakarta Pusat Lt 11
              </Box>
            </Box>
            <Box display="flex" flexDir="column" mt="3">
              <Box as="span" fontWeight="semibold" textTransform="capitalize">
                Keterangan
              </Box>
              <Box as="p" textAlign="justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Box>
            </Box>
            <Box display="flex" flexDir="column" mt="3">
              <Box as="span" fontWeight="semibold" textTransform="capitalize">
                Lampiran
              </Box>
              <Grid templateColumns="repeat(3,1fr)" gap={6}>
                <Image src="/assets/img/photo_profile.png" alt="Lampiran 1" />
                <Image src="/assets/img/photo_profile.png" alt="Lampiran 1" />
                <Image src="/assets/img/photo_profile.png" alt="Lampiran 1" />
              </Grid>
            </Box>
            <FormTechnicianReport />
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
