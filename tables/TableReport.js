import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Badge,
  FormLabel,
  useDisclosure,
  FormControl,
  Input,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import transparentTheme from "../styles/tableTheme";
import InputFilterTable from "../components/InputFilterTable";
import moment from "moment";
import "moment/locale/id";
import axios from "axios";
import OptionButtonMenuTable from "../components/OptionButtonMenuTable";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider, Field } from "formik";

const TableUserAccount = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [reports, setReports] = useState([]);
  const [ids, setIds] = useState("");
  const [user, setUser] = useState([]);
  const [category, setCategory] = useState([]);

  const fetchReportUserAndCategory = async () => {
    try {
      const users = await axios.get("http://localhost/eror/api/user");
      const category = await axios.get("http://localhost/eror/api/kategori");
      const result = await axios.get("http://localhost/eror/api/laporan");
      setReports(result.data.data);
      setUser(users.data.data);
      setCategory(category.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchReportUserAndCategory();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openAndSetIds = (val) => {
    onOpen();
    setIds(val);
  };

  const dataFiltered = reports.filter((val) => {
    return val.id === ids;
  });

  const Schema = Yup.object().shape({
    pelapor_id: Yup.number().required("Input tidak boleh kosong"),
    jenis_kerusakan: Yup.string().required("Input tidak boleh kosong"),
    lokasi: Yup.string().required("Input tidak boleh kosong"),
    keterangan: Yup.string().required(),
    kategori_id: Yup.number().required("Input tidak boleh kosong"),
  });

  let initValues = {};

  dataFiltered.map(async (result) => {
    return (initValues = {
      pelapor_id: result.pelapor_id,
      jenis_kerusakan: result.jenis_kerusakan,
      lokasi: result.lokasi,
      keterangan: result.keterangan,
      kategori_id: result.kategori_id,
    });
  });

  const updateReport = (ids, values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(values);

      const result = axios.put(
        `http://localhost/eror/api/laporan/update/id/${ids}`,
        body,
        config
      );
      setIds("");
      fetchReportUserAndCategory();
    } catch (error) {
      alert(error);
    }
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Schema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      updateReport(ids, values);
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
    { names: "User Detail", selector: "user_info" },
    { names: "Report Detail", selector: "report_detail" },
    { names: "Last Edited By", selector: "edited_by" },
    { names: "Option", selector: "option", width: "15%" },
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

  transparentTheme;

  const dataTable = reports.map((result, index) => {
    const BadgeProgress = (
      <Badge
        colorScheme={
          parseInt(result.status_id) === 4
            ? "blue"
            : parseInt(result.status_id) === 3
            ? "yellow"
            : parseInt(result.status_id) === 2
            ? "red"
            : "green"
        }
        variant="solid"
      >
        {result.nama}
      </Badge>
    );
    return {
      id: index,
      no: index + 1,
      username: result.username,
      nama_lengkap: result.nama_lengkap,
      jenis_kelamin: result.jenis_kelamin,
      email: result.email,
      no_telp: result.no_telp,
      jabatan: result.jabatan,
      status: result.nama,
      jenis_kerusakan: result.jenis_kerusakan,
      status_id: result.status_id,
      lokasi: result.lokasi,
      keterangan: result.keterangan,
      keterangan_admin: result.keterangan_admin,
      keterangan_teknisi: result.keterangan_teknisi,
      tanggal_lapor: moment(result.tanggal_lapor).format("Do MMMM YYYY"),
      tanggal_pengecekan: moment(result.tanggal_pengecekan).format(
        "Do MMMM YYYY"
      ),
      user_info: (
        <Box my="3">
          <Text fontSize="1.3em">{result.nama_lengkap}</Text>
          <Text color="gray.400">{result.email}</Text>
        </Box>
      ),
      report_detail: (
        <Box my="3">
          <Text fontSize="1.3em">{result.jenis_kerusakan}</Text>
          <Text color="gray.400">{result.lokasi}</Text>
          {BadgeProgress}
        </Box>
      ),
      user_contact: (
        <Box my="3">
          <Text fontSize="1.3em">{result.email}</Text>
          <Text color="gray.400">{result.no_telp}</Text>
        </Box>
      ),
      roles: (
        <Box my="3">
          <Text fontSize="1.3em">{result.jabatan}</Text>
          <Text color="gray.400">{result.role}</Text>
        </Box>
      ),
      option: (
        <OptionButtonMenuTable setAndOpen={() => openAndSetIds(result.id)} />
      ),
      progress: BadgeProgress,
    };
  });

  const filteredItems = dataTable.filter((item) => {
    if (!filterText) return true;
    if (
      item.username.toLowerCase().includes(filterText.toLowerCase()) ||
      item.nama_lengkap.toLowerCase().includes(filterText.toLowerCase()) ||
      item.jenis_kelamin.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterText.toLowerCase()) ||
      item.no_telp.toLowerCase().includes(filterText.toLowerCase()) ||
      item.jabatan.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toLowerCase().includes(filterText.toLowerCase())
    ) {
      return true;
    }
  });

  const columns = columnNames.map((res) => {
    return {
      name: res.names,
      selector: (row) => row[res.selector],
      sortable: true,
      width: res.width,
      center: res.center,
    };
  });

  const ExpandedComponent = ({ data }) => (
    <Box display="flex" py="5" justifyContent="space-around">
      <Box>
        <Heading
          fontSize="1.2em"
          color="yellow.500"
          textTransform="uppercase"
          pt="5"
        >
          User Detail
        </Heading>
        <Box px="5">
          <Box py="3">
            <FormLabel color="yellow.100">Username</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.username}
            </Text>
          </Box>
          <Box>
            <FormLabel color="yellow.100">Nama Lengkap</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.nama_lengkap}
            </Text>
          </Box>
          <Box py="3">
            <FormLabel color="yellow.100">Jenis Kelamin</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.jenis_kelamin}
            </Text>
          </Box>
          <Box>
            <FormLabel color="yellow.100">Email</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.email}
            </Text>
          </Box>
          <Box py="3">
            <FormLabel color="yellow.100">No Telepon</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.no_telp}
            </Text>
          </Box>
          <Box>
            <FormLabel color="yellow.100">Jabatan</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.jabatan}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <Heading
          fontSize="1.2em"
          color="yellow.500"
          textTransform="uppercase"
          pt="5"
        >
          Report Detail
        </Heading>
        <Box px="5">
          <Box py="3">{data.progress}</Box>
          <Box py="3">
            <FormLabel color="yellow.100">Kategori</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              Mechanical Electronic
            </Text>
          </Box>
          <Box>
            <FormLabel color="yellow.100">Jenis Kerusakan</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.jenis_kerusakan}
            </Text>
          </Box>
          <Box py="3">
            <FormLabel color="yellow.100">Lokasi</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.lokasi}
            </Text>
          </Box>
          <Box>
            <FormLabel color="yellow.100">Keterangan</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.keterangan}
            </Text>
          </Box>
          <Box display="flex" py="3">
            <Box>
              <FormLabel color="yellow.100">Tanggal Lapor</FormLabel>
              <Text
                fontSize="1.1em"
                color="yellow.300"
                textTransform="capitalize"
                fontWeight="bold"
              >
                {data.tanggal_lapor}
              </Text>
            </Box>
            <Box pl="5">
              <FormLabel color="yellow.100">Tanggal Pengecekan</FormLabel>
              <Text
                fontSize="1.1em"
                color="yellow.300"
                textTransform="capitalize"
                fontWeight="bold"
              >
                {data.tanggal_pengecekan}
              </Text>
            </Box>
          </Box>
          <Box>
            <FormLabel color="yellow.100">Keterangan Admin</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.keterangan_admin}
            </Text>
          </Box>
          <Box>
            <FormLabel color="yellow.100">Keterangan Teknisi</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.keterangan_teknisi}
            </Text>
          </Box>
          <Box>
            <FormLabel color="yellow.100">Terakhir Diedit Oleh</FormLabel>
            <Text
              fontSize="1.1em"
              color="yellow.300"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {data.nama_lengkap}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );

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

  const userOption = user.map((result, index) => {
    return (
      <option value={result.id} key={index}>
        {result.username}
      </option>
    );
  });

  const categoryOption = category.map((result, index) => {
    return (
      <option value={result.id} key={index}>
        {result.nama}
      </option>
    );
  });

  const modalEdit = (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Report</ModalHeader>
        <ModalCloseButton />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl
                id="pelapor_id"
                pt="5"
                isInvalid={Boolean(touched.pelapor_id && errors.pelapor_id)}
              >
                <FormLabel textTransform="capitalize">Pelapor</FormLabel>
                <Select
                  placeholder="Pilih User"
                  name="pelapor_id"
                  {...getFieldProps("pelapor_id")}
                  onBlur={handleBlur}
                >
                  {userOption}
                </Select>
                <FormErrorMessage>
                  {touched.pelapor_id && errors.pelapor_id}
                </FormErrorMessage>
              </FormControl>
              {InputTypeText("jenis_kerusakan")}
              {InputTypeText("lokasi")}
              {InputTypeText("keterangan")}
              <FormControl
                id="kategori_id"
                pt="5"
                isInvalid={Boolean(touched.kategori_id && errors.kategori_id)}
              >
                <FormLabel textTransform="capitalize">Kategori</FormLabel>
                <Select
                  placeholder="Pilih Kategori"
                  name="kategori_id"
                  {...getFieldProps("kategori_id")}
                  onBlur={handleBlur}
                >
                  {categoryOption}
                </Select>
                <FormErrorMessage>
                  {touched.kategori_id && errors.kategori_id}
                </FormErrorMessage>
              </FormControl>
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
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          highlightOnHover
          pointerOnHover
          theme="dark"
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </Box>
    </Box>
  );
};

export default TableUserAccount;
