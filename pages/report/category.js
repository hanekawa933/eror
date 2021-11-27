import Head from "next/head";
import DashboardLayout from "../../layouts/dashboard";
import CardCategory from "../../components/CardCategory";
import { Box, Grid, useColorMode } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { useEffect, useContext, useState } from "react";
import { ProtectedRoute } from "../../HOC/withAuth";
import { TempContext } from "../../context/TempContext";
import axios from "axios";

export default function CategoryList() {
  const [userLogin, setUserLogin] = useState([]);
  const [category, setCategory] = useState([]);
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
    }
  };

  const fetchCategory = async () => {
    try {
      const result = await axios.get("http://localhost/eror_api/api/kategori");
      setCategory(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUserLogin();
    fetchCategory();
  }, []);

  const listCategory = category.map((res) => {
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
            <Box display="flex" alignItems="center" fontWeight="semibold">
              <Icon
                icon="bi:clock-history"
                width={16 * 2.2}
                height={16 * 2.2}
                color={useColorMode().colorMode === "dark" ? "white" : "black"}
              />
              <Box as="span" textTransform="capitalize" fontSize="2.2em" ml="3">
                daftar kategori
              </Box>
            </Box>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="5">
                {listCategory}
              </Grid>
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
