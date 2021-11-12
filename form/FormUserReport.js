import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import axios from "axios";

const FormUserReport = () => {
  const [create, setCreate] = useState([]);
  const [user, setUser] = useState([]);
  const [category, setCategory] = useState([]);

  const fetchUserAndCategory = async () => {
    try {
      const users = await axios.get("http://localhost/eror/api/user");
      const category = await axios.get("http://localhost/eror/api/kategori");
      setUser(users.data.data);
      setCategory(category.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUserAndCategory();
  }, []);

  const Schema = Yup.object().shape({
    pelapor_id: Yup.number().required("Input tidak boleh kosong"),
    jenis_kerusakan: Yup.string().required("Input tidak boleh kosong"),
    lokasi: Yup.string().required("Input tidak boleh kosong"),
    keterangan: Yup.string().required(),
    kategori_id: Yup.number().required("Input tidak boleh kosong"),
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
      pelapor_id: "",
      jenis_kerusakan: "",
      lokasi: "",
      keterangan: "",
      kategori_id: "",
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

  const InputTypeText = (label) => {
    return (
      <FormControl
        id={label}
        pt="5"
        isInvalid={Boolean(touched[label] && errors[label])}
      >
        <FormLabel textTransform="capitalize">
          {label.split("_").join(" ")}
        </FormLabel>
        <Input
          type="text"
          name={label}
          {...getFieldProps(label)}
          onBlur={handleBlur}
        />
        <FormErrorMessage>{touched[label] && errors[label]}</FormErrorMessage>
      </FormControl>
    );
  };

  return (
    <Box mt="5">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {InputTypeText("jenis_kerusakan")}
          {InputTypeText("lokasi")}
          <FormControl
            id="keterangan"
            pt="5"
            isInvalid={Boolean(touched.keterangan && errors.keterangan)}
          >
            <FormLabel textTransform="capitalize">Keterangan</FormLabel>
            <Textarea
              type="text"
              name="keterangan"
              {...getFieldProps("keterangan")}
              onBlur={handleBlur}
            />
            <FormErrorMessage>
              {touched.keterangan && errors.keterangan}
            </FormErrorMessage>
          </FormControl>
          <Box display="flex" justifyContent="end">
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitting}
              mt="5"
            >
              Masukan Data
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default FormUserReport;
