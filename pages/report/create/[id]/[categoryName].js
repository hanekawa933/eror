import Head from "next/head";
import DashboardLayout from "../../../../layouts/dashboard";
import { FormUserReport } from "../../../../form";
import { Box } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export default function CreateUserReport() {
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
              <Icon icon="carbon:report" width={16 * 2.2} height={16 * 2.2} />
              <Box as="span" fontSize="2.2em" ml="3">
                Create Report
              </Box>
            </Box>
            <FormUserReport />
          </Box>
        </Box>
      </DashboardLayout>
    </div>
  );
}
