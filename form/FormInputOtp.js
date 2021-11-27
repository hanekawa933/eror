import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
  PinInput,
  PinInputField,
  Grid,
} from "@chakra-ui/react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

const FormInputOtp = () => {
  const router = useRouter();
  const toast = useToast();

  const { email } = router.query;

  const Schema = Yup.object().shape({
    kode: Yup.number()
      .typeError("Input harus berupa angka")
      .required("Input tidak boleh kosong"),
  });

  const authResetOtp = async (values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(values);
      const encoded = encodeURIComponent(email);
      const result = await axios.post(
        `http://localhost/eror_api/api/user/auth_reset/email/${encoded}`,
        body,
        config
      );
      toast({
        title: "Berhasil Terkirim",
        description: "Autentikasi berhasil! Silahkan reset password anda.",
        status: "success",
        duration: 2000,
        position: "top",
      });
      router.push(`/forgot_password?email=${encoded}&otp=${values.kode}`);
    } catch (error) {
      toast({
        title: "Gagal Verifikasi",
        description: error.response
          ? error.response.data.message
          : "Server Error",
        status: "error",
        duration: 2000,
        position: "top",
      });
      const encoded = encodeURIComponent(email);
      router.push(`/forgot_password?email=${encoded}`);
      console.log(error.response);
    }
  };

  const formik = useFormik({
    initialValues: {
      kode: "",
    },
    validationSchema: Schema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      authResetOtp(values);
      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    handleBlur,
    values,
    handleChange,
    setFieldValue,
  } = formik;

  const handleInput = (val) => {
    setFieldValue("kode", val);
  };

  const handleComplete = (val) => {
    setFieldValue("kode", val);
  };

  console.log(values.kode);

  return (
    <>
      <Box>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box>
              <Box>
                <FormControl
                  id="kode"
                  isInvalid={Boolean(touched.kode && errors.kode)}
                >
                  <FormLabel textTransform="capitalize">Kode OTP</FormLabel>
                  <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <PinInput
                      size="lg"
                      name="kode"
                      onChange={handleInput}
                      onComplete={handleComplete}
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </Grid>
                  <FormErrorMessage>
                    {touched.kode && errors.kode}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Button
                colorScheme="orange"
                mt="5"
                type="submit"
                width="100%"
                isLoading={isSubmitting}
                isDisabled={values.kode.length < 4 ? true : false}
              >
                Verifikasi
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
    </>
  );
};

export default FormInputOtp;
