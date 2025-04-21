import { Stack } from "@mui/material";
import React, { useState } from "react";
import SearchHeader from "../components/SearchHeader";
import SectionWrapper from "../common/SectionWrapper";

import { AgGridReact } from "ag-grid-react";

const Users = () => {
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  const [colDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    <Stack height="100%">
      <SearchHeader title="Users" buttonText="Add User" />
      <SectionWrapper>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </SectionWrapper>
    </Stack>
  );
};

export default Users;
