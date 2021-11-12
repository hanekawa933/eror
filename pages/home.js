import { useEffect, useContext, useState } from "react";
import { ProtectedRoute } from "../HOC/withAuth";
import Head from "next/head";
import DashboardLayout from "../layouts/dashboard";
import CardCategory from "../components/CardCategory";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Grid,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import CardHistoryReport from "../components/CardHistoryReport";
import { TempContext } from "../context/TempContext";

const UserHomepage = () => {
  const [userLogin, setUserLogin] = useState([]);
  const [settings, setSettings] = useContext(TempContext);

  const fetchUserLogin = async () => {
    try {
      const result = await axios.get("http://localhost/eror/api/user/profile");
      setUserLogin(result.data.data[0]);
      setSettings({ ...settings, userLogin: result.data.data[0] });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUserLogin();
  }, []);

  console.log(settings);

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
                Hai, {userLogin.nama_lengkap}!
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
                Punya keluhan? Laporin langsung yuk!
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
            <Heading fontSize="1.3em">Lapor Kerusakan</Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="5">
              <CardCategory
                icon="/assets/svg/welcome.svg"
                category="Mechanical Engineering"
                id="1"
              />
              <CardCategory
                icon="/assets/svg/welcome.svg"
                category="Mechanical Engineering"
                id="1"
              />
              <CardCategory
                icon="/assets/svg/welcome.svg"
                category="Mechanical Engineering"
                id="1"
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
          <Box mt="10" p="5" borderRadius="lg">
            <Heading fontSize="1.3em">Laporan Terakhir</Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="5">
              <CardHistoryReport
                lokasi="Jl. Kebugisan Selatan"
                laporan="Pintu sulit dibuka"
                waktu="3 hari yang lalu"
                status="On-Progress"
                image="/assets/img/pintu.jpg"
                id="1"
              />
              <CardHistoryReport
                lokasi="Jl. Kebugisan Selatan"
                laporan="Pintu sulit dibuka"
                waktu="3 hari yang lalu"
                status="On-Progress"
                image="/assets/img/pintu.jpg"
                id="1"
              />
              <CardHistoryReport
                lokasi="Jl. Kebugisan Selatan"
                laporan="Pintu sulit dibuka"
                waktu="3 hari yang lalu"
                status="On-Progress"
                image="/assets/img/pintu.jpg"
                id="1"
              />
            </Grid>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="10"
            >
              <Button colorScheme="purple" textTransform="capitalize">
                Lihat semua laporan
              </Button>
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
};

export default ProtectedRoute(UserHomepage);
