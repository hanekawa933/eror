import Head from "next/head";
import DashboardLayout from "../../layouts/dashboard";
import { Box } from "@chakra-ui/react";

export default function DashboardHome() {
  return (
    <div>
      <Head>
        <title>E-ROR | SuperAdmin Home</title>
      </Head>
      <DashboardLayout></DashboardLayout>
    </div>
  );
}
