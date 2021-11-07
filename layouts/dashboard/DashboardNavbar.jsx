import React from "react";
import { Box, Avatar } from "@chakra-ui/react";
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
      <Avatar
        size="md"
        name="Avatar"
        src="/assets/img/photo_profile.png"
        cursor="pointer"
      />
    </Box>
  );
};

export default DashboardNavbar;
