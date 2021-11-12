import { useContext, useEffect } from "react";
import { TempContext } from "../../context/TempContext";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Heading,
  useColorMode,
  Switch,
  Button,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import NavSection from "./NavSection";

const DashboardSidebar = () => {
  const [settings, setSettings] = useContext(TempContext);

  const toggleChange = () => {
    setSettings({ ...settings, bigMode: !settings.bigMode });
  };

  const toggleSidebar = () => {
    setSettings({ ...settings, active: !settings.active });
  };

  return (
    <Box
      w={[
        "280px",
        "280px",
        "280px",
        settings.bigMode === true ? "90px" : "280px",
        settings.bigMode === true ? "90px" : "280px",
        settings.bigMode === true ? "90px" : "280px",
      ]}
      role="group"
      minH="100%"
      borderRight="2px"
      borderColor="gray.200"
      display={[
        settings.active === true ? "inline" : "none",
        settings.active === true ? "inline" : "none",
        settings.active === true ? "inline" : "none",
        "inline",
        "inline",
        "inline",
      ]}
      bg={useColorMode().colorMode === "dark" ? "gray.800" : "white"}
      transform={[
        settings.active === true ? "translateX(0)" : "translateX(-100%)",
        settings.active === true ? "translateX(0)" : "translateX(-100%)",
        settings.active === true ? "translateX(0)" : "translateX(-100%)",
        "translateX(0)",
        "translateX(0)",
        "translateX(0)",
      ]}
      pb="10"
      _hover={{
        width: settings.bigMode === true ? "280px" : "280px",
        opacity: [
          "1",
          "1",
          "1",
          settings.bigMode === true ? "0.97" : "1",
          settings.bigMode === true ? "0.97" : "1",
          settings.bigMode === true ? "0.97" : "1",
        ],
      }}
      position="absolute"
      zIndex={999}
    >
      <Flex
        pt="5"
        px="5"
        justifyContent={[
          "space-between",
          "space-between",
          "space-between",
          settings.bigMode === true ? "center" : "space-between",
          settings.bigMode === true ? "center" : "space-between",
          settings.bigMode === true ? "center" : "space-between",
        ]}
        alignItems="center"
        _groupHover={{ justifyContent: "space-between" }}
      >
        <Link href="/dashboard/home" passHref={true}>
          <a>
            <Image boxSize="50px" src="/assets/img/EROR.png" alt="E-ROR" />
          </a>
        </Link>
        <Tooltip label="Toggle Big Mode" zIndex={1000}>
          <Box>
            <Switch
              size="md"
              display={[
                "none",
                "none",
                "none",
                settings.bigMode === true ? "none" : "inline",
                settings.bigMode === true ? "none" : "inline",
                settings.bigMode === true ? "none" : "inline",
              ]}
              _groupHover={{
                display: ["none", "none", "none", "inline", "inline", "inline"],
              }}
              onChange={() => toggleChange()}
            />
          </Box>
        </Tooltip>
        <Button
          display={["inline", "inline", "inline", "none", "none", "none"]}
          onClick={() => toggleSidebar()}
        >
          <Icon icon="eva:close-fill" width={24} height={24} />
        </Button>
      </Flex>
      <Box
        my={[
          "7",
          "7",
          "7",
          settings.bigMode === true ? "4" : "7",
          settings.bigMode === true ? "4" : "7",
          settings.bigMode === true ? "4" : "7",
        ]}
        borderRadius="md"
        py="4"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow={[
          "xl",
          "xl",
          "xl",
          settings.bigMode === true ? "none" : "xl",
          settings.bigMode === true ? "none" : "xl",
          settings.bigMode === true ? "none" : "xl",
        ]}
        mx={settings.bigMode === true ? "0" : "5"}
        _groupHover={{ boxShadow: "xl", mx: "5", my: "7" }}
      >
        <Flex>
          <Avatar size="md" name="Avatar" src="/assets/img/photo_profile.png" />
          <Box
            mx="5"
            display={[
              "inline",
              "inline",
              "inline",
              settings.bigMode === true ? "none" : "inline",
              settings.bigMode === true ? "none" : "inline",
              settings.bigMode === true ? "none" : "inline",
            ]}
            _groupHover={{ display: "inline" }}
          >
            <Heading fontSize="md">Username</Heading>
            <Text
              fontSize="sm"
              color={
                useColorMode().colorMode === "dark" ? "gray.200" : "gray.700"
              }
            >
              Administrator
            </Text>
          </Box>
        </Flex>
      </Box>
      <NavSection />
    </Box>
  );
};

export default DashboardSidebar;
