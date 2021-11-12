import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import StepProgress from "../../../components/StepProgress";
import { Box, Badge, useColorMode, Grid, Text, Image } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export default function CategoryList() {
  return (
    <div>
      <Head>
        <title>E-ROR | User Report Details</title>
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
                icon="fluent:apps-list-detail-20-filled"
                width={16 * 2.2}
                height={16 * 2.2}
                color={useColorMode().colorMode === "dark" ? "white" : "black"}
              />
              <Box as="span" textTransform="capitalize" fontSize="2.2em" ml="3">
                detail laporan
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
            <Box display="flex" flexDir="column" width="max-content">
              <Box as="span" fontWeight="semibold" textTransform="capitalize">
                Status saat ini
              </Box>
              <Badge
                colorScheme="yellow"
                px="3"
                textAlign="center"
                borderRadius="md"
                mt="3"
                fontSize="1.2em"
              >
                Diperbaiki
              </Badge>
            </Box>
            <Box py="5">
              <Box as="span" fontWeight="semibold" textTransform="capitalize">
                Perkembangan Laporan
              </Box>
              <Grid templateColumns="repeat(5, 1fr)" mt="5">
                <StepProgress
                  stepNumber="1"
                  status="Terkirim"
                  icon="ant-design:file-done-outlined"
                  borderRadius="lg"
                  borderRadiusRight="none"
                  colorStatus="gray.300"
                  borderColor="gray.800"
                />
                <StepProgress
                  stepNumber="2"
                  status="Validasi"
                  icon="icon-park-outline:loading-two"
                  borderRadius="none"
                  borderRadiusRight="none"
                  colorStatus="gray.300"
                  borderColor="gray.800"
                />
                <StepProgress
                  stepNumber="3"
                  status="Pengecekan"
                  icon="akar-icons:check-in"
                  borderRadius="none"
                  borderRadiusRight="none"
                  colorStatus="gray.300"
                  borderColor="gray.800"
                />
                <StepProgress
                  stepNumber="4"
                  status="Diperbaiki"
                  icon="ion:construct-outline"
                  borderRadius="none"
                  borderRadiusRight="none"
                  colorStatus="yellow.400"
                  borderColor="yellow.700"
                />
                <StepProgress
                  stepNumber="5"
                  status="Selesai"
                  icon="ic:round-done-outline"
                  borderRadius="none"
                  borderRadiusRight="lg"
                  colorStatus="gray.50"
                  borderColor="gray.50"
                />
              </Grid>
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
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
