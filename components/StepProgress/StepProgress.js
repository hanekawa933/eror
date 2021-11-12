import { Box, useColorMode, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const StepProgress = ({
  icon,
  stepNumber,
  status,
  borderRadius,
  borderRadiusRight,
  colorStatus,
  borderColor,
}) => {
  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="space-around"
      alignItems="center"
      bg={colorStatus}
      borderRadius={borderRadius}
      borderRightRadius={borderRadiusRight}
      p="3"
      px="5"
      borderRight="2px solid white"
    >
      <Box
        bg={borderColor}
        width="50%"
        height="50%"
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        border={`5px solid white`}
        p="2"
      >
        <Icon
          icon={icon}
          width="100%"
          height="100%"
          color={useColorMode().colorMode === "dark" ? "white" : "white"}
        />
      </Box>
      <Box
        mt="3"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box as="span" fontWeight="semibold">
          Langkah {stepNumber}
        </Box>
        <Box as="span" fontSize="1em">
          {status}
        </Box>
      </Box>
    </Box>
  );
};

export default StepProgress;
