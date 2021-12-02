import { Box, Text, Link, useColorMode } from "@chakra-ui/react";

const CardCategory = ({ icon, category, id, role, notification = null }) => {
  const { colorMode } = useColorMode();
  const bgTheme = colorMode === "dark" ? "gray.700" : "gray.50";

  const slug = category.split(" ").join("_");
  const link =
    parseInt(role) === 1
      ? `/report/create`
      : parseInt(role) === 2
      ? `/admin/report/category`
      : `/technician/report/category`;
  return (
    <Link
      href={`${link}/${id}/${slug.toLowerCase()}`}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      role="group"
      position="relative"
    >
      {!notification ? null : (
        <Box
          position="absolute"
          top="-3"
          right="-3"
          bg="blue.300"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="full"
          width="40px"
          height="40px"
        >
          <Box as="span" color="white">
            {notification}
          </Box>
        </Box>
      )}
      <Box
        display="flex"
        flexDir="column"
        borderRadius="lg"
        boxShadow="lg"
        p={["0", "10"]}
        justifyContent="center"
        alignItems="center"
        bg={bgTheme}
        _groupHover={{
          bg: colorMode === "dark" ? "gray.900" : "gray.100",
          boxShadow: "2xl",
        }}
        border={
          colorMode === "dark"
            ? "1px solid var(--chakra-colors-gray-800)"
            : "1px solid var(--chakra-colors-gray-200)"
        }
        height={["40", "72"]}
      >
        <Text
          fontSize={["0.7em", "1.2em"]}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
        >
          {category}
        </Text>
        <Box
          as="object"
          data={"http://localhost/eror_api" + icon}
          type="image/svg+xml"
          maxW="100%"
          height={["16", "44", "44", "44", "48", "52"]}
          mt={["5", "5", "5", "5", "5", "5"]}
          pointerEvents="none"
        ></Box>
      </Box>
    </Link>
  );
};

export default CardCategory;
