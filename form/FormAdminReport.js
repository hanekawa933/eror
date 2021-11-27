import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import axios from "axios";

const FormAdminReport = ({ id, statusId, fetchReport }) => {
  const toast = useToast();
  const Schema = Yup.object().shape({
    ket_admin: Yup.string().required("Input tidak boleh kosong"),
  });

  const validateReport = async (data) => {
    const body = JSON.stringify(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const result = await axios.post(
        `http://localhost/eror_api/api/notifikasi/admin_validasi/id/${id}`,
        body,
        config
      );
      fetchReport();
      toast({
        title: "Berhasil",
        description: "Laporan berhasil divalidasi!",
        status: "success",
        duration: 2000,
        position: "top",
      });
      console.log(result);
    } catch (error) {
      toast({
        title: "Gagal",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        position: "top",
      });
      alert(error);
      console.log(error);
    }
  };

  const finishAdmin = async (data) => {
    const body = JSON.stringify(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const result = await axios.post(
        `http://localhost/eror_api/api/notifikasi/finish_admin/id/${id}`,
        body,
        config
      );
      fetchReport();
      toast({
        title: "Berhasil",
        description: "Laporan berhasil diproses!",
        status: "success",
        duration: 2000,
        position: "top",
      });
      console.log(result);
    } catch (error) {
      toast({
        title: "Gagal",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        position: "top",
      });
      alert(error);
      console.log(error);
    }
  };

  const duplicateReport = async (data) => {
    const body = JSON.stringify(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const result = await axios.post(
        `http://localhost/eror_api/api/notifikasi/admin_duplikasi/id/${id}`,
        body,
        config
      );
      fetchReport();
      toast({
        title: "Berhasil",
        description: "Laporan berhasil divalidasi!",
        status: "success",
        duration: 2000,
        position: "top",
      });
      console.log(result);
    } catch (error) {
      alert(error);
      console.log(error);
      toast({
        title: "Gagal",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      ket_admin: "",
    },
    validationSchema: Schema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
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
    submitForm,
    values,
  } = formik;

  return (
    <Box mt="5">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {parseInt(statusId) === 6 ? null : (
            <FormControl
              id="ket_admin"
              pt="5"
              isInvalid={Boolean(touched.ket_admin && errors.ket_admin)}
            >
              <FormLabel textTransform="capitalize">Keterangan Admin</FormLabel>
              <Textarea
                type="text"
                name="ket_admin"
                {...getFieldProps("ket_admin")}
                onBlur={handleBlur}
                rows="5"
              />
              <FormErrorMessage>
                {touched.ket_admin && errors.ket_admin}
              </FormErrorMessage>
            </FormControl>
          )}
          <Box display="flex" justifyContent="end">
            {parseInt(statusId) === 1 && parseInt(statusId) !== 6 ? (
              <>
                <Button
                  colorScheme="red"
                  isLoading={isSubmitting}
                  mt="5"
                  mx="3"
                  onClick={() => {
                    duplicateReport(values);
                    submitForm();
                  }}
                >
                  Duplikat
                </Button>
                <Button
                  colorScheme="green"
                  isLoading={isSubmitting}
                  mt="5"
                  onClick={() => {
                    validateReport(values);
                    submitForm();
                  }}
                >
                  Validasi
                </Button>
              </>
            ) : parseInt(statusId) === 3 && parseInt(statusId) !== 6 ? (
              <Button
                colorScheme="red"
                isLoading={isSubmitting}
                mt="5"
                mx="3"
                onClick={() => {
                  duplicateReport(values);
                  submitForm();
                }}
              >
                Duplikat
              </Button>
            ) : parseInt(statusId) === 2 && parseInt(statusId) !== 6 ? (
              <Button
                colorScheme="green"
                isLoading={isSubmitting}
                mt="5"
                onClick={() => {
                  validateReport(values);
                  submitForm();
                }}
              >
                Validasi
              </Button>
            ) : parseInt(statusId) === 7 ? (
              <Button
                colorScheme="green"
                isLoading={isSubmitting}
                mt="5"
                onClick={() => {
                  finishAdmin(values);
                  submitForm();
                }}
                display={parseInt(statusId) !== 7 ? "none" : "initial"}
              >
                Selesai
              </Button>
            ) : null}
          </Box>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default FormAdminReport;
