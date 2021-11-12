import { Box, Text, Link, useColorMode } from "@chakra-ui/react";

const CardCategory = ({ icon, category, id, role }) => {
  const { colorMode } = useColorMode();
  const bgTheme = colorMode === "dark" ? "gray.700" : "gray.50";

  const slug = category.split(" ").join("_");
  const link =
    role === "user"
      ? `http://localhost:3000/report/create`
      : role === "admin"
      ? `http://localhost:3000/admin/report/category`
      : `http://localhost:3000/technician/report/category`;
  return (
    <Link
      href={`${link}/${id}/${slug.toLowerCase()}`}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      role="group"
    >
      <Box
        display="flex"
        flexDir="column"
        borderRadius="lg"
        boxShadow="lg"
        p="10"
        justifyContent="center"
        alignItems="center"
        bg={bgTheme}
        _groupHover={{
          bg: colorMode === "dark" ? "gray.900" : "gray.100",
          boxShadow: "2xl",
        }}
      >
        <Text fontSize="1.2em" fontWeight="semibold" textTransform="uppercase">
          {category}
        </Text>
        <Box
          as="object"
          data={icon}
          type="image/svg+xml"
          maxW="100%"
          height={["32", "36", "40", "44", "48", "52"]}
          mt={["5", "5", "5", "5", "5", "5"]}
          pointerEvents="none"
        ></Box>
      </Box>
    </Link>
  );
};

export default CardCategory;
