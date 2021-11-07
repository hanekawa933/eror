import { useState, useEffect, useMemo } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
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
      const result = await axios.get("http://localhost/eror/api/user");
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
    { names: "User Info", selector: "user_info", width: "13%" },
    { names: "User Profile", selector: "user_profile", width: "30%" },
    { names: "User Contact", selector: "user_contact", width: "25%" },
    { names: "Roles", selector: "roles", width: "13%" },
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

  transparentTheme;

  const dataTable = users.map((result, index) => {
    return {
      no: index + 1,
      username: result.username,
      nama_lengkap: result.nama_lengkap,
      jenis_kelamin: result.jenis_kelamin,
      email: result.email,
      no_telp: result.no_telp,
      jabatan: result.jabatan,
      role_id: result.role_id,
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
      item.jabatan.toLowerCase().includes(filterText.toLowerCase())
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
          <Text color="gray.400">{result.jenis_kelamin}</Text>
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
          <Text color="gray.400">{result.role_id}</Text>
        </Box>
      ),
      option: <OptionButtonMenuTable />,
    };
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

  return (
    <Box>
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
          theme="dark"
        />
      </Box>
    </Box>
  );
};

export default TableUserAccount;
