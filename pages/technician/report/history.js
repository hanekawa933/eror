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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Icon } from "@iconify/react";
import { TempContext } from "../../../context/TempContext";
import instance from "../../../axios.default";
import { useEffect, useContext, useState } from "react";
import { ProtectedRoute } from "../../../HOC/withAuth";

export default function ReportHistoryTeknisi() {
  const gridResponsive = [
    "repeat(1, 1fr)",
    "repeat(1, 1fr)",
    "repeat(2, 1fr)",
    "repeat(3, 1fr)",
    "repeat(3, 1fr)",
    "repeat(3, 1fr)",
  ];
  const [userLogin, setUserLogin] = useState([]);
  const [report, setReport] = useState([]);
  const [settings, setSettings] = useContext(TempContext);
  let [category, setCategory] = useState([]);
  let [status, setStatus] = useState([]);
  const [statusUsed, setStatusUsed] = useState(999);
  const [categoryUsed, setCategoryUsed] = useState(999);
  const [content, setContent] = useState({ start: 0, end: 6 });

  const fetchUserLogin = async () => {
    try {
      const result = await instance.get("/user/profile");
      setUserLogin(result.data.data);
      setSettings({ ...settings, userLogin: result.data.data });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const fetchStatus = async () => {
    try {
      const result = await instance.get("/laporan/status");
      setStatus(result.data.data ? result.data.data : []);
    } catch (error) {
      alert("error");
    }
  };

  const fetchReportByCategoryId = async (id) => {
    try {
      const result = await instance.get(`/laporan/history?query=teknisi`);
      setReport(result.data.data ? result.data.data : []);
    } catch (error) {
      alert(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const result = await instance.get(`/kategori`);
      setCategory(result.data.data ? result.data.data : []);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserLogin();
    fetchCategory();
    fetchReportByCategoryId();
    fetchStatus();
  }, []);

  status = [{ id: "999", nama: "Semua" }, ...status];

  const techStatus =
    status &&
    status.filter(
      (res) =>
        parseInt(res.id) === 4 ||
        parseInt(res.id) === 5 ||
        parseInt(res.id) === 6 ||
        parseInt(res.id) === 7 ||
        parseInt(res.id) === 999
    );

  const listOfButton =
    techStatus &&
    techStatus.map((res) => {
      const parsedId = parseInt(res.id);
      return (
        <MenuItem
          key={res.id}
          px="0"
          py="0"
          background={
            (parsedId === 1 && statusUsed === 1) ||
            (parsedId === 6 && statusUsed === 6)
              ? "green.100"
              : (parsedId === 2 && statusUsed === 2) ||
                (parsedId === 7 && statusUsed === 7)
              ? "red.100"
              : parsedId === 3 && statusUsed === 3
              ? "blue.100"
              : (parsedId === 4 && statusUsed === 4) ||
                (parsedId === 5 && statusUsed === 5)
              ? "yellow.100"
              : parsedId === 999 && statusUsed === 999
              ? "orange.100"
              : "gray.50"
          }
          onClick={() => setStatusUsed(parsedId)}
        >
          <Button
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
            isFullWidth
            variant="ghost"
          >
            {res.nama}
          </Button>
        </MenuItem>
      );
    });

  const activeStatus =
    status && status.filter((res) => parseInt(res.id) === parseInt(statusUsed));

  const activeCategory =
    category &&
    category.filter((res) => parseInt(res.id) === parseInt(categoryUsed));

  const tabs = category.map((res) => {
    return (
      <Tab key={res.id} width="100%" onClick={() => setCategoryUsed(res.id)}>
        <Box
          background={
            parseInt(categoryUsed) === parseInt(res.id)
              ? "orange.100"
              : "gray.50"
          }
          _hover={{
            background:
              parseInt(categoryUsed) === parseInt(res.id)
                ? "orange.300"
                : "gray.100",
          }}
          fontWeight="semibold"
          color={
            parseInt(categoryUsed) === parseInt(res.id)
              ? "orange.500"
              : "gray.900"
          }
          w="100%"
          py="1"
        >
          {res.nama}
        </Box>
      </Tab>
    );
  });

  const notFound = (kategori, semua = false) => {
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
          Ooops... tidak ada data pada
          {semua ? " semua kategori" : ` kategori ${kategori}`}
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

    const filteredStatus = data[cat.nama.toLowerCase()].filter((stat) => {
      return parseInt(stat.status_id) === statusUsed;
    });

    if (filteredStatus < 1) {
      return (
        <TabPanel p="0">
          {data[cat.nama.toLowerCase()] < 1 ? (
            notFound(cat.nama.toLowerCase())
          ) : (
            <Grid templateColumns={gridResponsive} gap={["3", "6"]} mt="5">
              {data[cat.nama.toLowerCase()]
                .map((res) => {
                  return (
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
                  );
                })
                .slice(content.start, content.end)}
            </Grid>
          )}
          {data[cat.nama.toLowerCase()].length <=
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
    } else {
      return (
        <TabPanel p="0">
          <Grid templateColumns={gridResponsive} gap={["3", "6"]} mt="5">
            {filteredStatus
              .map((res) => {
                return (
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
                );
              })
              .slice(content.start, content.end)}
          </Grid>
          {filteredStatus.length <= parseInt(content.end) ? null : (
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

  const filteredStatus = report.filter((stat) => {
    return parseInt(stat.status_id) === statusUsed;
  });

  const allCategoryStatusFilter = (
    <>
      {filteredStatus
        .map((res) => {
          return (
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
          );
        })
        .slice(content.start, content.end)}
      ;
      {parseInt(filteredStatus.length) <= parseInt(content.end) ? null : (
        <Box mt="5" display="flex" justifyContent="center" alignItems="center">
          <Button
            colorScheme="orange"
            px="5"
            onClick={() => setContent({ ...content, end: content.end + 3 })}
          >
            Load more
          </Button>
        </Box>
      )}
    </>
  );

  const allCategoryNoFilter = (
    <>
      {report
        .map((res) => {
          return (
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
          );
        })
        .slice(content.start, content.end)}
      ;
      {parseInt(report.length) <= parseInt(content.end) ? null : (
        <Box mt="5" display="flex" justifyContent="center" alignItems="center">
          <Button
            colorScheme="orange"
            px="5"
            onClick={() => setContent({ ...content, end: content.end + 3 })}
          >
            Load more
          </Button>
        </Box>
      )}
    </>
  );

  const allCategory =
    parseInt(statusUsed) === 999
      ? allCategoryNoFilter
      : allCategoryStatusFilter;

  const buttonStatus =
    parseInt(activeStatus[0].id) === 1 || parseInt(activeStatus[0].id) === 6
      ? "green"
      : parseInt(activeStatus[0].id) === 2 || parseInt(activeStatus[0].id) === 7
      ? "red"
      : parseInt(activeStatus[0].id) === 3
      ? "blue"
      : parseInt(activeStatus[0].id) === 4 || parseInt(activeStatus[0].id) === 5
      ? "yellow"
      : parseInt(activeStatus[0].id) === 999
      ? "orange"
      : "gray";

  return (
    <div>
      <Head>
        <title>E-ROR | Riwayat Laporan User</title>
      </Head>
      <DashboardLayout>
        <Box px="5" pb="14">
          <Box p={["3", "3", "5"]}>
            <Box display="flex" alignItems="center" fontWeight="semibold">
              <Icon
                icon="bi:clock-history"
                width={30}
                height={30}
                color={useColorMode().colorMode === "dark" ? "white" : "black"}
              />
              <Box as="span" fontSize={["1em", "1.5em", "2.2em"]} ml="3">
                Riwayat Laporan
              </Box>
            </Box>
            <Tabs variant="soft-rounded" colorScheme="orange" isLazy mt="3">
              <TabList display="flex" justifyContent="right">
                <Menu autoSelect={false}>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme="orange"
                    mx="3"
                  >
                    Kategori
                  </MenuButton>
                  <MenuList>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDir="column"
                    >
                      <Tab width="100%" onClick={() => setCategoryUsed(999)}>
                        <Box
                          background={
                            parseInt(categoryUsed) === parseInt(999)
                              ? "orange.100"
                              : "gray.50"
                          }
                          fontWeight="semibold"
                          color={
                            parseInt(categoryUsed) === parseInt(999)
                              ? "orange.500"
                              : "gray.900"
                          }
                          w="100%"
                          py="1"
                          _hover={{
                            background:
                              parseInt(categoryUsed) === parseInt(999)
                                ? "orange.300"
                                : "gray.100",
                          }}
                        >
                          Semua
                        </Box>
                      </Tab>
                      {tabs}
                    </Box>
                  </MenuList>
                </Menu>
                <Menu autoSelect={false}>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme="blue"
                  >
                    Status
                  </MenuButton>
                  <MenuList>
                    <Box>{listOfButton}</Box>
                  </MenuList>
                </Menu>
              </TabList>
              <Box display="flex" justifyContent="end" my="3">
                <Tag size="md" variant="subtle" colorScheme="orange" mx="2">
                  {activeCategory.length < 1 ? "Semua" : activeCategory[0].nama}
                </Tag>
                <Tag size="md" variant="subtle" colorScheme={buttonStatus}>
                  {activeStatus[0].nama}
                </Tag>
              </Box>
              <TabPanels>
                <TabPanel p="0">
                  <Grid
                    templateColumns={gridResponsive}
                    gap={["3", "6"]}
                    mt="5"
                  >
                    {allCategory}
                  </Grid>
                  {report.length < 1 ? notFound("", true) : ""}
                </TabPanel>
                {tabList}
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
