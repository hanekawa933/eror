import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { darkTheme, lightTheme } from "../styles/tableTheme";
import InputFilterTable from "../components/InputFilterTable";
import axios from "axios";
import OptionButtonMenuTable from "../components/OptionButtonMenuTable";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider, Field } from "formik";

const TableSuperAdminAccount = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [ids, setIds] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchUserData = async () => {
    try {
      const result = await axios.get("http://localhost/eror/api/superadmin");
      setUsers(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [ids]);

  const openAndSetIds = (val) => {
    onOpen();
    setIds(val);
  };

  const dataFiltered = users.filter((val) => {
    return val.id === ids;
  });

  let initValues = {};

  dataFiltered.map(async (result) => {
    return (initValues = {
      username: result.username,
      nama_lengkap: result.nama_lengkap,
      password: "",
      password_verify: "",
    });
  });

  const Schema = Yup.object().shape({
    username: Yup.string().required("Input tidak boleh kosong"),
    nama_lengkap: Yup.string().required("Input tidak boleh kosong"),
    password: Yup.string().min(
      8,
      "Password minimal harus terdiri dari 8 karakter"
    ),
    password_verify: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords tidak sama"
    ),
  });

  const updateSuperAdmin = (ids, values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(values);

      const result = axios.put(
        `http://localhost/eror/api/superadmin/update/id/${ids}`,
        body,
        config
      );
      setIds("");
      fetchUserData();
    } catch (error) {
      alert(error);
    }
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Schema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      updateSuperAdmin(ids, values);
      resetForm({});
      onClose();
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
  } = formik;

  const columnNames = [
    { names: "No", selector: "no", width: "7%" },
    { names: "User Info", selector: "user_info", width: "calc(80% / 2)" },
    { names: "User Profile", selector: "user_profile", width: "calc(80% / 2)" },
    { names: "Option", selector: "option" },
  ];

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <InputFilterTable
        onFilterText={(e) => setFilterText(e.target.value)}
        clearFilter={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  darkTheme;
  lightTheme;

  const dataTable = users.map((result, index) => {
    return {
      id: result.id,
      no: index + 1,
      username: result.username,
      nama_lengkap: result.nama_lengkap,
      password: result.password,
    };
  });

  const filteredItems = dataTable.filter((item) => {
    if (!filterText) return true;
    if (
      item.username.toLowerCase().includes(filterText.toLowerCase()) ||
      item.nama_lengkap.toLowerCase().includes(filterText.toLowerCase())
    ) {
      return true;
    }
  });

  const filteredTableWithStyle = filteredItems.map((result, index) => {
    return {
      no: index + 1,
      user_info: (
        <Text fontSize="1.3em" my="3">
          {result.username}
        </Text>
      ),
      user_profile: (
        <Box my="3">
          <Text fontSize="1.3em">{result.nama_lengkap}</Text>
        </Box>
      ),
      option: (
        <OptionButtonMenuTable setAndOpen={() => openAndSetIds(result.id)} />
      ),
    };
  });

  const columns = columnNames.map((res) => {
    return {
      name: res.names,
      selector: (row) => row[res.selector],
      sortable: true,
      width: res.width,
    };
  });

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

  const modalEdit = (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>SuperAdmin</ModalHeader>
        <ModalCloseButton />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <ModalBody>
              {InputTypeText("username")}
              {InputTypeText("nama_lengkap")}
              <Box display="flex">
                <FormControl
                  id="password"
                  pt="5"
                  isInvalid={Boolean(touched.password && errors.password)}
                >
                  <FormLabel textTransform="capitalize">password</FormLabel>
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
                <FormControl
                  id="password_verify"
                  pt="5"
                  ml="5"
                  isInvalid={Boolean(
                    touched.password_verify && errors.password_verify
                  )}
                >
                  <FormLabel textTransform="capitalize">
                    Verifikasi Password
                  </FormLabel>
                  <Input
                    type="password"
                    name="password_verify"
                    {...getFieldProps("password_verify")}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>
                    {touched.password_verify && errors.password_verify}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Text color="gray.400" fontSize="small" mt="3">
                *Biarkan kosong jika tidak ingin mengubah password
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Batal
              </Button>
              <Button
                type="submit"
                colorScheme="green"
                isLoading={isSubmitting}
              >
                Ubah Data
              </Button>
            </ModalFooter>
          </Form>
        </FormikProvider>
      </ModalContent>
    </Modal>
  );

  return (
    <Box>
      {modalEdit}
      <Box mt="5">
        <DataTable
          columns={columns}
          data={filteredTableWithStyle}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          highlightOnHover
          pointerOnHover
          theme={useColorMode().colorMode === "dark" ? "dark" : "light"}
        />
      </Box>
    </Box>
  );
};

export default TableSuperAdminAccount;
