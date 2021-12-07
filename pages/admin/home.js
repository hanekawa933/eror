import Head from "next/head";
import { useEffect, useContext, useState } from "react";
import { ProtectedRoute } from "../../HOC/withAuth";
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
import { TempContext } from "../../context/TempContext";
import instance from "../../axios.default";
import Link from "next/link";

export default function UserHomepage() {
  const { colorMode } = useColorMode();
  const bgTheme = colorMode === "dark" ? "gray.700" : "gray.50";
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

  const gridResponsive = [
    "repeat(3, 1fr)",
    "repeat(1, 1fr)",
    "repeat(3, 1fr)",
    "repeat(3, 1fr)",
    "repeat(3, 1fr)",
    "repeat(3, 1fr)",
  ];

  const [userLogin, setUserLogin] = useState([]);
  const [category, setCategory] = useState([]);
  const [report, setReport] = useState([]);
  const [settings, setSettings] = useContext(TempContext);

  const fetchUserLogin = async () => {
    try {
      const result = await instance.get("/user/profile");
      setUserLogin(result.data.data);
      setSettings({ ...settings, userLogin: result.data.data });
    } catch (error) {
      alert(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const result = await instance.get("/kategori/notif?query=admin");
      setCategory(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  const fetchReportByUserLogin = async () => {
    try {
      const result = await instance.get("/laporan/user");
      setReport(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUserLogin();
    fetchCategory();
    fetchReportByUserLogin();
  }, []);

  const listCategory = category
    .map((res) => {
      return (
        <CardCategory
          key={res.id}
          icon={res.icon}
          category={res.nama}
          id={res.id}
          role={userLogin.role_id}
          notification={res.notifikasi}
        />
      );
    })
    .slice(0, 3);

  return (
    <div>
      <Head>
        <title>E-ROR | Halaman Home</title>
      </Head>
      <DashboardLayout>
        <Box px={["3", "5"]} pt="5" pb="7">
          <Box
            px={["5%", "10%"]}
            py="5"
            borderRadius="lg"
            boxShadow="lg"
            display="flex"
            background={bgTheme}
            justifyContent={jfyContentResponsive}
            flexDir={jfyDirResponsive}
            alignItems={alItemsResponsive}
            bg="#FFD202"
          >
            <Box>
              <Heading
                fontSize={["1.2em", "1.4em", "1.6em", "1.8em", "2em", "2.2em"]}
                color="black"
                pb={["1", "2"]}
                textAlign={alignResponsive}
              >
                <Box as="span" display="block" color="rgba(0,0,0,0.55)">
                  Selamat datang,
                </Box>
                {userLogin.nama_lengkap}!
              </Heading>
              <Text
                color="rgba(0,0,0,0.55)"
                fontSize={["1em", "1em", "1em", "1.2em", "1.4em", "1.6em"]}
                fontWeight="semibold"
                textAlign={alignResponsive}
              >
                Periksa laporan masuk, yuk!
              </Text>
            </Box>
            <Box
              as="img"
              src="/assets/svg/amico.svg"
              maxW="100%"
              height={["52", "56", "60", "48", "64", "72"]}
              mt={["5", "5", "5", "0", "0", "0"]}
            ></Box>
          </Box>
          <Box p="5" mt={["5", "10"]}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading fontSize="1.3em">Kategori Laporan</Heading>
              <Link href="/admin/report/category">
                <a>
                  <Button
                    colorScheme="orange"
                    textTransform="capitalize"
                    size="sm"
                  >
                    lihat semua kategori
                  </Button>
                </a>
              </Link>
            </Box>
            <Grid templateColumns={gridResponsive} gap={[3, 6]} mt="9">
              {listCategory}
            </Grid>
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
