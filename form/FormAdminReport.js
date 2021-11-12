import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import axios from "axios";

const FormAdminReport = () => {
  const Schema = Yup.object().shape({
    keterangan_admin: Yup.string().required("Input tidak boleh kosong"),
  });

  const createReport = async (data) => {
    const body = JSON.stringify(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const result = await axios.post(
        "http://localhost/eror/api/laporan",
        body,
        config
      );
      setCreate(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      keterangan_admin: "",
    },
    validationSchema: Schema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      createReport(values);
      setSubmitting(false);
      resetForm({});
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
  } = formik;

  return (
    <Box mt="5">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <FormControl
            id="keterangan_admin"
            pt="5"
            isInvalid={Boolean(
              touched.keterangan_admin && errors.keterangan_admin
            )}
          >
            <FormLabel textTransform="capitalize">Keterangan Admin</FormLabel>
            <Textarea
              type="text"
              name="keterangan_admin"
              {...getFieldProps("keterangan_admin")}
              onBlur={handleBlur}
              rows="5"
            />
            <FormErrorMessage>
              {touched.keterangan_admin && errors.keterangan_admin}
            </FormErrorMessage>
          </FormControl>
          <Box display="flex" justifyContent="end">
            <Button
              type="submit"
              colorScheme="red"
              isLoading={isSubmitting}
              mt="5"
              mx="3"
            >
              Tolak
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              isLoading={isSubmitting}
              mt="5"
            >
              Validasi
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default FormAdminReport;
