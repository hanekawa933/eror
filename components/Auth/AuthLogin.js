import Cookie from "js-cookie";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Link,
  Box,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import axios from "axios";

import { useRouter } from "next/router";

const AuthLogin = () => {
  const toast = useToast();
  const Router = useRouter();
  const [user, setUser] = useState([]);
  const [hidden, setHidden] = useState(true);

  const Schema = Yup.object().shape({
    email: Yup.string()
      .required("Email tidak boleh kosong")
      .email("Email tidak valid"),
    password: Yup.string().required("Password tidak boleh kosong"),
  });

  const login = async (val) => {
    try {
      const body = JSON.stringify(val);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await axios.post(
        "http://localhost/eror_api/api/user/login",
        body,
        config
      );
      Cookie.set("token", `Bearer ${result.data.token}`);

      axios.defaults.headers.common[
        "x-auth-token"
      ] = `Bearer ${result.data.token}`;

      const user = await axios.get(
        "http://localhost/eror_api/api/user/profile"
      );

      const user_role = parseInt(user.data.data.role_id);

      const route =
        user_role === 1
          ? "/home"
          : user_role === 2
          ? "/admin/home"
          : "/technician/home";

      toast({
        title: "Berhasil login",
        status: "success",
        duration: 2000,
        position: "top",
      });

      Router.push(route);
    } catch (error) {
      toast({
        title: !error.response ? "Server Error" : error.response.data.message,
        description: "Gagal login!",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const viewPassword = () => {
    setHidden(!hidden);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      login(values);
      setTimeout(() => {
        resetForm({});
        setSubmitting(false);
      }, 2000);
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    handleBlur,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <FormControl
          id="email"
          isInvalid={Boolean(touched.email && errors.email)}
        >
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            name="email"
            {...getFieldProps("email")}
            onBlur={handleBlur}
          />
          <FormErrorMessage>{touched.email && errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          pt="5"
          isInvalid={Boolean(touched.password && errors.password)}
        >
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={hidden ? "password" : "text"}
              name="password"
              {...getFieldProps("password")}
              onBlur={handleBlur}
            />
            <InputRightElement
              mx="3"
              cursor="pointer"
              onClick={() => viewPassword()}
            >
              {hidden ? <ViewIcon w={6} h={6} /> : <ViewOffIcon w={6} h={6} />}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {touched.password && errors.password}
          </FormErrorMessage>
        </FormControl>
        <Box mt="3">
          <Link color="#E67503" href="/forgot_password" fontWeight="700">
            Lupa password?
          </Link>
        </Box>
        <Button
          type="submit"
          colorScheme="orange"
          w="100%"
          isLoading={isSubmitting}
          mt="5"
        >
          Login
        </Button>
      </Form>
    </FormikProvider>
  );
};

export default AuthLogin;
