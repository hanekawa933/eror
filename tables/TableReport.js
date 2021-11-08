import { useState, useEffect, useMemo } from "react";
import { Box, Button, Heading, Text, Badge, FormLabel } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import transparentTheme from "../styles/tableTheme";
import InputFilterTable from "../components/InputFilterTable";
import moment from "moment";
import "moment/locale/id";
import axios from "axios";
import OptionButtonMenuTable from "../components/OptionButtonMenuTable";

const TableUserAccount = () => {
  const [query, setQuery] = useState(``);
  const [active, setActive] = useState([1]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUserData = async () => {
    try {
      const result = await axios.get("http://localhost/eror/api/laporan");
      setUsers(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const dataTable = users.map((result, index) => {
    const BadgeProgress = (
      <Badge
        colorScheme={
          result.status_id === 4
            ? "blue"
            : result.status_id === 3
            ? "yellow"
            : result.status_id === 2
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
      option: <OptionButtonMenuTable />,
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

  return (
    <Box>
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
