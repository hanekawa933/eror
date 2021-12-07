import { useEffect, useContext, useState } from "react";
import { ProtectedRoute } from "../../../HOC/withAuth";
import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import StepProgress from "../../../components/StepProgress";
import { Box, Badge, useColorMode, Grid, Text, Image } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { TempContext } from "../../../context/TempContext";
import instance from "../../../axios.default";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/id";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import path from "../../../constant.default";

export default function CategoryList() {
  const [userLogin, setUserLogin] = useState([]);
  const [report, setReport] = useState([]);
  const [settings, setSettings] = useContext(TempContext);

  const router = useRouter();
  const { reportId } = router.query;

  const fetchUserLogin = async () => {
    try {
      const result = await instance.get("/user/profile");
      setUserLogin(result.data.data);
      console.log(result.data.data);
      setSettings({ ...settings, userLogin: result.data.data });
    } catch (error) {
      alert(error);
    }
  };

  const fetchLaporanById = async (id) => {
    try {
      const result = await instance.get(`/laporan/item/id/${id}`);
      setReport(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (!reportId) {
      return;
    }
    fetchUserLogin();
    fetchLaporanById(reportId);
  }, [reportId]);

  const listOfStep = [...Array(5)].map((_, i) => {
    return (
      <StepProgress
        index={i}
        stepNumber={i + 1}
        status_id={parseInt(report.sId)}
        key={i}
      />
    );
  });

  const badgeColor =
    parseInt(report.sId) === 1 || parseInt(report.sId) === 6
      ? "green"
      : parseInt(report.sId) === 2 || parseInt(report.sId) === 7
      ? "red"
      : parseInt(report.sId) === 4 || parseInt(report.sId) === 5
      ? "yellow"
      : "blue";

  const gambar = report && report.gambar ? report.gambar : [];

  const listOfImage = gambar.map((res, index) => {
    return (
      <Box key={index}>
        <Image
          src={path + res.gambar}
          alt="Lampiran 3"
          height={["52", "52", "96"]}
          w="100%"
          borderTopRadius="lg"
          objectFit="center"
        />
      </Box>
    );
  });

  const listOfImageBukti = gambar.map((res, index) => {
    return (
      <Box key={index}>
        <Image
          src={path + res.gambar}
          alt="Lampiran 3"
          height="96"
          w="100%"
          borderTopRadius="lg"
          objectFit="center"
        />
      </Box>
    );
  });

  return (
    <div>
      <Head>
        <title>E-ROR | User Report Details</title>
      </Head>
      <DashboardLayout>
        <Box px="5" pb="14">
          <Box>
            <Box width="100%" borderRadius="lg">
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
                showArrows={true}
              >
                {gambar.length > 0 ? (
                  listOfImage
                ) : (
                  <Image
                    src="/assets/img/no-image.png"
                    alt="No Image"
                    width="100%"
                    height={["52", "52", "96"]}
                  />
                )}
              </Carousel>
            </Box>
            <Box px="5" pb="10">
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" flexDir="column" width="max-content" py="5">
                  <Text fontSize="1em" fontWeight="bold" color="gray.600">
                    {moment(report.tanggal_lapor).format("Do/MM/YYYY")}
                  </Text>
                  <Text
                    fontSize={["1em", "1em", "1.2em"]}
                    fontWeight="bold"
                    color="gray.600"
                  >
                    {report.kode_laporan}
                  </Text>
                  <Text fontSize={["1em", "1em", "1.7em"]} fontWeight="bold">
                    {report.jenis_kerusakan}
                  </Text>
                  <Badge
                    colorScheme={badgeColor}
                    py={["1", "1", "3"]}
                    px={["2", "2", "5"]}
                    textAlign="center"
                    borderRadius="full"
                    mt="3"
                    fontSize={["1em", "1em", "1.1em"]}
                  >
                    {report.status}
                  </Badge>
                </Box>
                <Box
                  as="img"
                  src={path + report.icon}
                  maxW="100%"
                  height={["24", "32", "52"]}
                  px={["0", "0", "20"]}
                ></Box>
              </Box>
              <Box display="flex" flexDir="column" mt="3">
                <Box
                  as="span"
                  fontWeight="bold"
                  textTransform="capitalize"
                  fontSize={["1em", "1.2em", "1.4em"]}
                >
                  Lokasi
                </Box>
                <Box
                  as="p"
                  fontWeight="semibold"
                  color="gray.500"
                  fontSize={["1em", "1em", "1.2em"]}
                >
                  {report.lokasi}
                </Box>
              </Box>
              <Box display="flex" flexDir="column" mt="3">
                <Box
                  as="span"
                  fontWeight="bold"
                  textTransform="capitalize"
                  fontSize={["1em", "1.2em", "1.4em"]}
                >
                  Keterangan
                </Box>
                <Box
                  as="p"
                  textAlign="justify"
                  fontWeight="semibold"
                  color="gray.500"
                  fontSize={["1em", "1em", "1.2em"]}
                >
                  {report.keterangan}
                </Box>
              </Box>
              <Box py="5">
                <Box
                  as="span"
                  fontWeight="bold"
                  textTransform="capitalize"
                  fontSize={["1em", "1.2em", "1.4em"]}
                >
                  Perkembangan Laporan
                </Box>
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(5, 1fr)",
                  ]}
                  grid
                  mt="5"
                >
                  {listOfStep}
                </Grid>
              </Box>
              {parseInt(report.status_id) !== 6 &&
              parseInt(report.status_id) !== 7 ? null : (
                <Box py="5">
                  <Box
                    as="span"
                    fontWeight="bold"
                    textTransform="capitalize"
                    fontSize="1.4em"
                  >
                    Bukti Teknisi
                  </Box>
                  <Grid templateColumns="repeat(5, 1fr)" mt="5">
                    {listOfStep}
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
