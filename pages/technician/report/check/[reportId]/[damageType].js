import Head from "next/head";
import DashboardLayout from "../../../../../layouts/dashboard";
import {
  TahapPengecekan,
  TahapSetelahPengecekan,
  TahapSetelahPerbaikan,
} from "../../../../../form/FormTechnicianReport";
import { Box, Grid, Image, Text, Badge } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { TempContext } from "../../../../../context/TempContext";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/id";
import { useEffect, useContext, useState } from "react";
import { ProtectedRoute } from "../../../../../HOC/withAuth";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function TechnicianCheckReport() {
  const [userLogin, setUserLogin] = useState([]);
  const [report, setReport] = useState([]);
  const [settings, setSettings] = useContext(TempContext);

  const router = useRouter();
  const { reportId } = router.query;
  const fetchUserLogin = async () => {
    try {
      const result = await axios.get(
        "http://localhost/eror_api/api/user/profile"
      );
      setUserLogin(result.data.data);
      setSettings({ ...settings, userLogin: result.data.data });
    } catch (error) {
      alert(error);
    }
  };

  const fetchLaporanById = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost/eror_api/api/laporan/item/id/${id}`
      );
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
          src={"http://localhost/eror_api" + res.gambar}
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
        <title>E-ROR | Teknisi Cek Laporan</title>
      </Head>
      <DashboardLayout>
        <Box px="14" pb="14">
          <Box
            borderRadius="lg"
            boxShadow="2xl"
            _hover={{ boxShadow: "dark-lg" }}
          >
            <Box width="100%" borderRadius="lg">
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
                showArrows={true}
                showThumbs={false}
              >
                {gambar.length > 0 ? (
                  listOfImage
                ) : (
                  <Box>
                    <Image
                      src="/assets/img/no-image.png"
                      alt="Did not attach"
                      width="100%"
                      height="96"
                    />
                  </Box>
                )}
              </Carousel>
            </Box>
            <Box px="10" pb="10" mt="5">
              <Box display="flex" alignItems="center" fontWeight="semibold">
                <Icon icon="carbon:report" width={16 * 2.2} height={16 * 2.2} />
                <Box as="span" fontSize="2.2em" ml="3">
                  Validasi Laporan
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" flexDir="column" width="max-content" py="5">
                  <Text fontSize="1em" fontWeight="bold" color="gray.600">
                    {moment(report.tanggal_lapor).format("Do/MM/YYYY")}
                  </Text>
                  <Text fontSize="1.4em" fontWeight="bold" color="gray.600">
                    {report.kode_laporan}
                  </Text>
                  <Text fontSize="1.7em" fontWeight="bold">
                    {report.jenis_kerusakan}
                  </Text>
                  <Badge
                    colorScheme={badgeColor}
                    py="3"
                    px="5"
                    textAlign="center"
                    borderRadius="full"
                    mt="3"
                    fontSize="1.1em"
                  >
                    {report.status}
                  </Badge>
                </Box>
                <Box
                  as="img"
                  src={"http://localhost/eror_api" + report.icon}
                  maxW="100%"
                  height="52"
                  px="20"
                ></Box>
              </Box>
              <Box display="flex" flexDir="column" mt="3">
                <Box
                  as="span"
                  fontWeight="bold"
                  textTransform="capitalize"
                  fontSize="1.4em"
                >
                  Lokasi
                </Box>
                <Box
                  textAlign="justify"
                  fontWeight="semibold"
                  color="gray.500"
                  fontSize="1.2em"
                >
                  {report.lokasi}
                </Box>
              </Box>
              <Box display="flex" flexDir="column" mt="3">
                <Box
                  as="span"
                  fontWeight="bold"
                  textTransform="capitalize"
                  fontSize="1.4em"
                >
                  Keterangan
                </Box>
                <Box
                  textAlign="justify"
                  fontWeight="semibold"
                  color="gray.500"
                  fontSize="1.2em"
                >
                  {report.keterangan}
                </Box>
              </Box>
              {parseInt(report.status_id) === 3 ? (
                <TahapPengecekan
                  id={reportId}
                  fetchReport={
                    !reportId ? null : () => fetchLaporanById(reportId)
                  }
                />
              ) : parseInt(report.status_id) === 4 ? (
                <TahapSetelahPengecekan
                  id={reportId}
                  fetchReport={
                    !reportId ? null : () => fetchLaporanById(reportId)
                  }
                />
              ) : parseInt(report.status_id) === 5 ? (
                <TahapSetelahPerbaikan
                  id={reportId}
                  fetchReport={
                    !reportId ? null : () => fetchLaporanById(reportId)
                  }
                />
              ) : null}
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
