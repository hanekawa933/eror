import Head from "next/head";
import DashboardLayout from "../../layouts/dashboard";
import CardCategory from "../../components/CardCategory";
import {
  Box,
  Heading,
  Text,
  Grid,
  useColorMode,
  Button,
} from "@chakra-ui/react";

export default function UserHomepage() {
  const { colorMode } = useColorMode();
  const bgTheme = colorMode === "dark" ? "gray.700" : "gray.50";
  const colorTheme = colorMode === "dark" ? "white" : "black";
  const colorThemeSecondary = colorMode === "dark" ? "gray.200" : "gray.500";
  const jfyContentResponsive = [
    "center",
    "center",
    "center",
    "space-between",
    "space-between",
    "space-between",
  ];
  const alItemsResponsive = [
    "center",
    "center",
    "center",
    "center",
    "center",
    "center",
  ];
  const jfyDirResponsive = ["column", "column", "column", "row", "row", "row"];
  const alignResponsive = [
    "center",
    "center",
    "center",
    "left",
    "left",
    "left",
  ];
  return (
    <div>
      <Head>
        <title>E-ROR | SuperAdmin Create Account</title>
      </Head>
      <DashboardLayout>
        <Box px="10" pt="5" pb="7">
          <Box
            px="10%"
            py="5"
            borderRadius="lg"
            boxShadow="lg"
            display="flex"
            background={bgTheme}
            justifyContent={jfyContentResponsive}
            flexDir={jfyDirResponsive}
            alignItems={alItemsResponsive}
          >
            <Box>
              <Heading
                fontSize={["1.2em", "1.4em", "1.6em", "1.8em", "2em", "2.2em"]}
                color={colorTheme}
                pb="2"
                textAlign={alignResponsive}
              >
                Hai, Muhammad Iqbal Ramadhan!
              </Heading>
              <Heading
                fontSize={["1em", "1.2em", "1.4em", "1.6em", "1.8em", "2em"]}
                color={colorTheme}
                textAlign={alignResponsive}
              >
                Selamat datang di E-ROR.
              </Heading>
              <Text
                color={colorThemeSecondary}
                fontSize={["1em", "1em", "1em", "1.2em", "1.4em", "1.6em"]}
                fontWeight="semibold"
                textAlign={alignResponsive}
              >
                Lakukan perbaikan hasil laporan masuk yuk!
              </Text>
            </Box>
            <Box
              as="object"
              type="image/svg+xml"
              data="/assets/svg/welcome.svg"
              maxW="100%"
              height={["52", "56", "60", "48", "64", "72"]}
              mt={["5", "5", "5", "0", "0", "0"]}
            ></Box>
          </Box>
          <Box p="5" borderRadius="lg" mt="10">
            <Heading fontSize="1.3em">Kategori Laporan</Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="5">
              <CardCategory
                icon="/assets/svg/welcome.svg"
                category="Mechanical Engineering"
                id="1"
                role="teknisi"
              />
              <CardCategory
                icon="/assets/svg/welcome.svg"
                category="Mechanical Engineering"
                id="1"
                role="teknisi"
              />
              <CardCategory
                icon="/assets/svg/welcome.svg"
                category="Mechanical Engineering"
                id="1"
                role="teknisi"
              />
            </Grid>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="10"
            >
              <Button colorScheme="purple" textTransform="capitalize">
                Lihat semua kategori
              </Button>
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
