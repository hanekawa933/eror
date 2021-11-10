import { ChakraProvider } from "@chakra-ui/react";
import setAuthToken from "../middlewares/setAuthToken";

if (typeof window !== "undefined") {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
