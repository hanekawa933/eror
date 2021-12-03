import Head from "next/head";
import DashboardLayout from "../../../../layouts/dashboard";
import { FormUserReport } from "../../../../form";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { TempContext } from "../../../../context/TempContext";
import instance from "../../../../axios.default";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/id";
import path from "../../../../constant.default";

export default function CreateUserReport() {
  const [userLogin, setUserLogin] = useState([]);
  const [category, setCategory] = useState({});
  const [settings, setSettings] = useContext(TempContext);

  const router = useRouter();
  const { id } = router.query;

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

  const fetchCategoryById = async (id) => {
    try {
      const result = await instance.get(`/kategori/item/id/${id}`);
      setCategory(result.data.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchUserLogin();
    fetchCategoryById(id);
  }, [id]);

  return (
    <div>
      <Head>
        <title>E-ROR | Buat Laporan</title>
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
                src={path + category.icon}
                maxW="100%"
                height="52"
              ></Box>
            </Box>
            <FormUserReport id={id} />
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
