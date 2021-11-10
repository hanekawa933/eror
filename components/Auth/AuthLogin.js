import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import axios from "axios";

import { useRouter } from "next/router";

const AuthLogin = () => {
  const Router = useRouter();

  const Schema = Yup.object().shape({
    username: Yup.string().required("Username tidak boleh kosong"),
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
        "http://localhost/eror/api/superadmin/login",
        body,
        config
      );
      localStorage.setItem("token", `Bearer ${result.data.token}`);
      Router.push("/dashboard/home");
    } catch (error) {
      alert(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: (values, { resetForm, error, setSubmitting }) => {
      login(values);
      setSubmitting(false);
      resetForm();
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
          id="username"
          isInvalid={Boolean(touched.username && errors.username)}
        >
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            {...getFieldProps("username")}
            onBlur={handleBlur}
          />
          <FormErrorMessage>
            {touched.username && errors.username}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          pt="5"
          isInvalid={Boolean(touched.password && errors.password)}
        >
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            {...getFieldProps("password")}
            onBlur={handleBlur}
          />
          <FormErrorMessage>
            {touched.password && errors.password}
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
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
