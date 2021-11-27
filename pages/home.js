import { useEffect, useContext, useState } from "react";
import { ProtectedRoute } from "../HOC/withAuth";
import Head from "next/head";
import DashboardLayout from "../layouts/dashboard";
import CardCategory from "../components/CardCategory";
import {
  Box,
  Heading,
  Text,
  Grid,
  useColorMode,
  Button,
  Image,
} from "@chakra-ui/react";
import CardHistoryReport from "../components/CardHistoryReport";
import { TempContext } from "../context/TempContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const UserHomepage = () => {
  const router = useRouter();
  const [userLogin, setUserLogin] = useState([]);
  const [category, setCategory] = useState([]);
  const [report, setReport] = useState([]);
  const [settings, setSettings] = useContext(TempContext);

  const fetchUserLogin = async () => {
    try {
      const result = await axios.get(
        "http://localhost/eror_api/api/user/profile"
      );
      setUserLogin(result.data.data);
      setSettings({ ...settings, userLogin: result.data.data });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const result = await axios.get("http://localhost/eror_api/api/kategori");
      setCategory(result.data.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const fetchReportByUserLogin = async () => {
    try {
      const result = await axios.get(
        "http://localhost/eror_api/api/laporan/user"
      );
      setReport(result.data.data ? result.data.data : []);
    } catch (error) {
      alert(error);
      console.log(error);
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
        <>
          <CardCategory
            key={res.id}
            icon={res.icon}
            category={res.nama}
            id={res.id}
            role={userLogin.role_id}
          />
        </>
      );
    })
    .slice(0, 3);

  const listReport = report
    .map((res) => {
      return (
        <>
          <CardHistoryReport
            lokasi={res.lokasi}
            laporan={res.jenis_kerusakan}
            waktu={res.date_diff}
            status={res.status}
            image={
              res.gambar[0] && res.gambar[0].gambar
                ? res.gambar[0].gambar
                : "/assets/img/no-image.png"
            }
            id={res.lId}
            role={userLogin.role_id}
            status_id={res.sId}
          />
        </>
      );
    })
    .slice(0, 3);

  const notFound = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      p="5"
      boxShadow="md"
      mt="5"
    >
      <Box
        as="object"
        data="/assets/svg/not-found.svg"
        type="image/svg+xml"
        maxW="100%"
        height={["32", "36", "40", "44", "48", "52"]}
        mt={["5", "5", "5", "5", "5", "5"]}
        pointerEvents="none"
      ></Box>
      <Text as="h1" fontWeight="semibold">
        Ooops... Kamu belum pernah buat laporan.
      </Text>
    </Box>
  );

  const gridReport = (
    <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="5">
      {listReport}
    </Grid>
  );
  const showReport = report.length < 1 ? notFound : gridReport;

  const { colorMode } = useColorMode();
  const bgTheme = colorMode === "dark" ? "gray.700" : "gray.50";
  const colorTheme = colorMode === "dark" ? "white" : "black";
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
            bg="#FFD202"
          >
            <Box>
              <Heading
                fontSize={["1.2em", "1.4em", "1.6em", "1.8em", "2em", "2.2em"]}
                color="black"
                pb="2"
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
                Punya keluhan? Laporin langsung yuk!
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
          <Box p="5" borderRadius="lg" mt="10">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="10"
            >
              <Heading fontSize="1.3em" textTransform="capitalize">
                Request For Repair
              </Heading>
              <Link href="/report/category">
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
            <Grid
              templateColumns={[
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap={6}
              mt="5"
            >
              {listCategory}
            </Grid>
          </Box>
          <Box mt="10" p="5" borderRadius="lg">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="10"
            >
              <Heading fontSize="1.3em">Laporan Terakhir</Heading>
              {report.length > 0 ? (
                <Link href="/report/history">
                  <a>
                    <Button
                      colorScheme="orange"
                      size="sm"
                      textTransform="capitalize"
                    >
                      Lihat semua laporan
                    </Button>
                  </a>
                </Link>
              ) : null}
            </Box>
            {showReport}
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
};

export default ProtectedRoute(UserHomepage);
