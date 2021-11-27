import Head from "next/head";
import DashboardLayout from "../../../layouts/dashboard";
import CardHistoryReport from "../../../components/CardHistoryReport";
import {
  Box,
  Grid,
  useColorMode,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { TempContext } from "../../../context/TempContext";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { ProtectedRoute } from "../../../HOC/withAuth";

export default function ReportHistoryAdmin() {
  const [userLogin, setUserLogin] = useState([]);
  const [report, setReport] = useState([]);
  const [settings, setSettings] = useContext(TempContext);
  const [category, setCategory] = useState([]);
  let [status, setStatus] = useState([]);
  const [statusUsed, setStatusUsed] = useState(999);
  const [content, setContent] = useState({ start: 0, end: 6 });

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

  const fetchReportByCategoryId = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost/eror_api/api/laporan/history?query=admin`
      );
      setReport(result.data.data ? result.data.data : []);
    } catch (error) {
      alert(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const result = await axios.get(`http://localhost/eror_api/api/kategori`);
      setCategory(result.data.data ? result.data.data : []);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const fetchStatus = async () => {
    try {
      const result = await axios.get(
        "http://localhost/eror_api/api/laporan/status"
      );
      setStatus(result.data.data ? result.data.data : []);
    } catch (error) {
      alert("error");
    }
  };

  useEffect(() => {
    fetchUserLogin();
    fetchCategory();
    fetchReportByCategoryId();
    fetchStatus();
  }, []);

  status = [{ id: "999", nama: "Semua" }, ...status];

  const listOfButton =
    status &&
    status.map((res) => {
      const parsedId = parseInt(res.id);
      return (
        <Button
          key={res.id}
          colorScheme={
            (parsedId === 1 && statusUsed === 1) ||
            (parsedId === 6 && statusUsed === 6)
              ? "green"
              : (parsedId === 2 && statusUsed === 2) ||
                (parsedId === 7 && statusUsed === 7)
              ? "red"
              : parsedId === 3 && statusUsed === 3
              ? "blue"
              : (parsedId === 4 && statusUsed === 4) ||
                (parsedId === 5 && statusUsed === 5)
              ? "yellow"
              : parsedId === 999 && statusUsed === 999
              ? "orange"
              : "gray"
          }
          mr="3"
          size="sm"
          borderRadius="full"
          onClick={() => setStatusUsed(parsedId)}
        >
          {res.nama}
        </Button>
      );
    });

  const tabs = category.map((res) => {
    return <Tab key={res.id}>{res.nama}</Tab>;
  });

  const notFound = (kategori) => {
    return (
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
          Ooops... tidak ada data pada kategori {kategori}
        </Text>
      </Box>
    );
  };

  const data = {};

  const tabList = category.map((cat) => {
    const filtered = report.filter((rep) => {
      return parseInt(cat.id) === parseInt(rep.kId);
    });

    data = { ...data, [cat.nama.toLowerCase()]: filtered };

    if (data[cat.nama.toLowerCase()] < 1) {
      return <TabPanel>{notFound(cat.nama.toLowerCase())}</TabPanel>;
    } else {
      return (
        <TabPanel>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="5">
            {data[cat.nama.toLowerCase()]
              .map((res) => {
                return statusUsed === parseInt(res.status_id) ? (
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
                    key={res.lId}
                  />
                ) : statusUsed === 999 ? (
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
                    key={res.lId}
                  />
                ) : null;
              })
              .slice(content.start, content.end)}
          </Grid>
          {console.log(parseInt(data[cat.nama.toLowerCase()].length))}

          {parseInt(data[cat.nama.toLowerCase()].length) <=
          parseInt(content.end) ? null : (
            <Box
              mt="5"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                colorScheme="orange"
                px="5"
                onClick={() => setContent({ ...content, end: content.end + 3 })}
              >
                Load more
              </Button>
            </Box>
          )}
        </TabPanel>
      );
    }
  });

  return (
    <div>
      <Head>
        <title>E-ROR | Riwayat Laporan Admin</title>
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
                Riwayat Laporan
              </Box>
            </Box>
            <Tabs variant="soft-rounded" colorScheme="orange" mt="5" isLazy>
              <TabList>{tabs}</TabList>
              <Box mt="5">{listOfButton}</Box>
              <TabPanels>{tabList}</TabPanels>
            </Tabs>
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
