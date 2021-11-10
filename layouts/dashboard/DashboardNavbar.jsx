import React from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Divider,
} from "@chakra-ui/react";
import { SettingsIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Icon } from "@iconify/react";
import Image from "next/image";

const DashboardNavbar = () => {
  const NavbarMobile = "64px";
  const NavbarDesktop = "92px";
  return (
    <Box
      sx={{ "--my-calculation": "calc(100% - 280px)" }}
      w={[
        "100%",
        "100%",
        "100%",
        "100%",
        "var(--my-calculation)",
        "var(--my-calculation)",
      ]}
      justifyContent="space-between"
      alignItems="center"
      height={[
        NavbarMobile,
        NavbarMobile,
        NavbarMobile,
        NavbarMobile,
        NavbarDesktop,
        NavbarDesktop,
      ]}
      position="fixed"
      top="0"
      right="0"
      px="6"
      display="flex"
    >
      <Icon icon="ci:list-ul" width={30} height={30} cursor="pointer" />
      <p>Disini Logo</p>
      <Menu>
        <MenuButton as={Button}>
          <SettingsIcon />
        </MenuButton>
        <MenuList>
          <Box as="span" px="5" fontSize="1.1em" fontWeight="bold">
            Settings
          </Box>
          <Divider pb="3" />
          <Box display="flex" flexDirection="column" px="5">
            <Box as="span" py="3" fontWeight="semibold">
              App Theme
            </Box>
            <Box display="flex" justifyContent="space-around">
              <Box
                cursor="pointer"
                width="20"
                height="20"
                display="flex"
                justifyContent="center"
                alignItems="center"
                background="yellow.100"
                borderRadius="md"
                _hover={{ background: "yellow.200" }}
              >
                <SunIcon color="gray.900" />
              </Box>
              <Box
                cursor="pointer"
                width="20"
                height="20"
                display="flex"
                justifyContent="center"
                alignItems="center"
                background="gray.800"
                borderRadius="md"
                _hover={{ background: "gray.900" }}
              >
                <MoonIcon />
              </Box>
            </Box>
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default DashboardNavbar;
