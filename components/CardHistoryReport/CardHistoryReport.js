import { Box, Text, Badge, Link, useColorMode, Image } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
const CardHistoryReport = ({
  laporan,
  lokasi,
  waktu,
  status,
  image,
  id,
  role,
  status_id,
}) => {
  const { colorMode } = useColorMode();
  const bgTheme = colorMode === "dark" ? "gray.700" : "gray.50";
  const colorTheme = colorMode === "dark" ? "gray.200" : "gray.700";

  const slug = laporan.split(" ").join("_");

  const badgeColor =
    parseInt(status_id) === 1 || parseInt(status_id) === 6
      ? "green"
      : parseInt(status_id) === 2 || parseInt(status_id) === 7
      ? "red"
      : parseInt(status_id) === 4 || parseInt(status_id) === 5
      ? "yellow"
      : "blue";

  const link =
    parseInt(role) === 1
      ? `http://localhost:3000/report`
      : parseInt(role) === 2
      ? `http://localhost:3000/admin/report/validate`
      : `http://localhost:3000/technician/report/check`;
  return (
    <Link
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      role="group"
      href={`${link}/${id}/${slug.toLowerCase()}`}
    >
      <Box
        bg={bgTheme}
        borderRadius="xl"
        pb="5"
        boxShadow="lg"
        _groupHover={{
          bg: colorMode === "dark" ? "gray.900" : "gray.100",
          boxShadow: "2xl",
        }}
        border={
          colorMode === "dark"
            ? "1px solid var(--chakra-colors-gray-800)"
            : "1px solid var(--chakra-colors-gray-200)"
        }
        height={["80"]}
      >
        <Image
          src={"http://localhost/eror_api" + image}
          alt="Last Report Image"
          borderTopRadius="lg"
          w="100%"
          height="48"
        />
        <Box p="6">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Badge colorScheme={badgeColor} px="3">
              {status}
            </Badge>
            <Box
              color={colorTheme}
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="sm"
            >
              <CalendarIcon />
              <Box as="span" ml="2">
                {waktu}
              </Box>
            </Box>
          </Box>

          <Box
            mt="3"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {laporan}
          </Box>

          <Box isTruncated>{lokasi}</Box>
        </Box>
      </Box>
    </Link>
  );
};

export default CardHistoryReport;
