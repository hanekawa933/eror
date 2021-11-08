import { useState, useEffect, useMemo } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import transparentTheme from "../styles/tableTheme";
import InputFilterTable from "../components/InputFilterTable";
import axios from "axios";
import OptionButtonMenuTable from "../components/OptionButtonMenuTable";

const TableCategory = () => {
  const [query, setQuery] = useState(``);
  const [active, setActive] = useState([1]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUserData = async () => {
    try {
      const result = await axios.get("http://localhost/eror/api/kategori");
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
    { names: "Category", selector: "category" },
    { names: "Icon Category", selector: "icon_category" },
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
      id: index,
      no: index + 1,
      nama: result.nama,
      category: (
        <Text fontSize="1.3em" my="3">
          {result.nama}
        </Text>
      ),
      icon_category: (
        <Box my="3">
          <Text fontSize="1.3em">{result.nama}</Text>
        </Box>
      ),
      option: <OptionButtonMenuTable />,
    };
  });

  const filteredItems = dataTable.filter((item) => {
    if (!filterText) return true;
    if (item.nama.toLowerCase().includes(filterText.toLowerCase())) {
      return true;
    }
  });

  const columns = columnNames.map((res) => {
    return {
      name: res.names,
      selector: (row) => row[res.selector],
      sortable: true,
      width: res.width,
    };
  });

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
        />
      </Box>
    </Box>
  );
};

export default TableCategory;
