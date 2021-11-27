import Head from "next/head";
import DashboardLayout from "../../../../../layouts/dashboard";
import CardHistoryReport from "../../../../../components/CardHistoryReport";
import { Box, Grid, useColorMode, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { TempContext } from "../../../../../context/TempContext";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { ProtectedRoute } from "../../../../../HOC/withAuth";

import { useRouter } from "next/router";

function ReportHistory() {
  const [userLogin, setUserLogin] = useState([]);
  const [report, setReport] = useState([]);
  const [settings, setSettings] = useContext(TempContext);
  const [category, setCategory] = useState({});

  const router = useRouter();
  const { categoryId } = router.query;

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

  const fetchReportByCategoryId = async () => {
    try {
      const result = await axios.get(
        `http://localhost/eror_api/api/laporan/kategori?category=${categoryId}&query=admin`
      );
      setReport(result.data.data ? result.data.data : []);
    } catch (error) {
      alert(error);
    }
  };

  const fetchCategoryById = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost/eror_api/api/kategori/item/id/${id}`
      );
      setCategory(result.data.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!categoryId) {
      return;
    }
    fetchUserLogin();
    fetchReportByCategoryId();
    fetchCategoryById(categoryId);
  }, [categoryId]);

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
        Ooops... Belum ada laporan masuk nih.
      </Text>
    </Box>
  );

  const listReport = report.map((res) => {
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
  });

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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              w="100%"
              bg={useColorMode().colorMode === "dark" ? "gray.700" : "gray.100"}
              borderRadius="lg"
              px="10"
            >
              <Box>
                <Text
                  fontSize="1.6em"
                  color={
                    useColorMode().colorMode === "dark"
                      ? "gray.400"
                      : "gray.600"
                  }
                  fontWeight="semibold"
                  letterSpacing="1px"
                >
                  Request for repair:
                </Text>
                <Text
                  fontSize="2em"
                  fontWeight="bold"
                  textTransform="capitalize"
                  letterSpacing="2px"
                >
                  {category.nama}
                </Text>
              </Box>
              <Box
                as="img"
                src={"http://localhost/eror_api" + category.icon}
                maxW="100%"
                height="52"
              ></Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              fontWeight="semibold"
              mt="5"
            >
              <Icon
                icon="bi:clock-history"
                width={16 * 2.2}
                height={16 * 2.2}
                color={useColorMode().colorMode === "dark" ? "white" : "black"}
              />
              <Box as="span" fontSize="2.2em" ml="3">
                Laporan Masuk
              </Box>
            </Box>
            <Box>
              {report.length < 1 ? (
                notFound
              ) : (
                <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="5">
                  {listReport}
                </Grid>
              )}
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}

export default ProtectedRoute(ReportHistory);
