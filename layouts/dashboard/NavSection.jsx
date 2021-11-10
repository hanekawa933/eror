import React from "react";
import {
  Box,
  List,
  ListItem,
  useColorMode,
  Text,
  Link,
} from "@chakra-ui/react";
import { Link as NextLink } from "next/link";
import { general, report, operational } from "./SidebarData";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

const logoutIcon = "simple-line-icons:logout";
const getIcon = (icon) => <Icon icon={icon} width={22} height={22} />;

const NavSection = ({ logout }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const ActiveList = (path, key, icon, text, btn) => {
    return (
      <ListItem borderRadius="md" key={key} my="3">
        <Link
          as={NextLink}
          href={path}
          onClick={btn}
          alignItems="center"
          display="flex"
          borderRadius="md"
          bg={colorMode === "dark" ? "gray.700" : "gray.100"}
          p="3"
          boxShadow="dark-lg"
          _hover={{ textDecoration: "none" }}
        >
          {icon}
          <Text
            color={colorMode === "dark" ? "gray.100" : "gray.700"}
            fontWeight="500"
            fontSize="sm"
            casing="uppercase"
            mx="5"
          >
            {text}
          </Text>
        </Link>
      </ListItem>
    );
  };

  const NonActiveList = (path, key, icon, text, btn) => {
    return (
      <ListItem borderRadius="md" key={key} my="3">
        <Link
          as={NextLink}
          href={path}
          onClick={btn}
          alignItems="center"
          display="flex"
          borderRadius="md"
          _hover={{
            background: colorMode === "dark" ? "gray.700" : "gray.100",
          }}
          p="3"
        >
          {icon}
          <Text
            color={colorMode === "dark" ? "gray.100" : "gray.700"}
            fontWeight="500"
            fontSize="sm"
            casing="uppercase"
            mx="5"
          >
            {text}
          </Text>
        </Link>
      </ListItem>
    );
  };

  const checkWhatListIsActive = (path, key, icon, text, log) =>
    path === router.pathname
      ? ActiveList(path, key, icon, text, log)
      : NonActiveList(path, key, icon, text, log);

  const GeneralList = general.map((data, index) => {
    return checkWhatListIsActive(data.to, index, data.icon, data.text);
  });
  const OperationalList = operational.map((data, index) => {
    return checkWhatListIsActive(data.to, index, data.icon, data.text);
  });
  const ReportList = report.map((data, index) => {
    return checkWhatListIsActive(data.to, index, data.icon, data.text);
  });

  const logoutLink = (
    <ListItem>
      <Link
        href="/dashboard"
        borderRadius="md"
        _hover={{
          background: colorMode === "dark" ? "gray.700" : "gray.100",
          textDecoration: "none",
        }}
        onClick={logout}
        alignItems="center"
        display="flex"
        p="3"
      >
        {getIcon(logoutIcon)}
        <Text
          color={colorMode === "dark" ? "gray.100" : "gray.700"}
          fontWeight="500"
          fontSize="sm"
          casing="uppercase"
          mx="5"
        >
          logout
        </Text>
      </Link>
    </ListItem>
  );

  return (
    <Box width="280px" mt="10">
      <Box>
        <Box>
          <Text
            fontWeight="500"
            fontSize="sm"
            casing="uppercase"
            mx="5"
            my="5"
            letterSpacing="2px"
          >
            General
          </Text>
        </Box>
        <List px="5">
          {GeneralList}
          {logoutLink}
        </List>
      </Box>
      <Box>
        <Text
          fontWeight="500"
          fontSize="sm"
          casing="uppercase"
          mx="5"
          my="5"
          letterSpacing="2px"
        >
          Create
        </Text>
        <List px="5">{OperationalList}</List>
      </Box>
      <Box>
        <Text
          fontWeight="500"
          fontSize="sm"
          casing="uppercase"
          mx="5"
          my="5"
          letterSpacing="2px"
        >
          Table Data
        </Text>
        <List px="5">{ReportList}</List>
      </Box>
    </Box>
  );
};

export default NavSection;
