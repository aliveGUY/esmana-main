import { Stack } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import SearchHeader from "../components/SearchHeader";
import SectionWrapper from "../common/SectionWrapper";

import { AgGridReact } from "ag-grid-react";

const Users = () => {
  const gridRef = useRef(null);

  const [rowData] = useState([
    { name: "John Doe", phone: "+1 234 56789", email: 'john.doe@gmail.com' },
    { name: "Jane Smith", phone: "+1 987 65432", email: 'jane.smith@outlook.com' },
    { name: "Michael Johnson", phone: "+44 7700 900123", email: 'michael.j@company.co.uk' },
    { name: "Emily Davis", phone: "+1 555 123456", email: 'emily.davis@yahoo.com' },
    { name: "Robert Wilson", phone: "+61 4 1234 5678", email: 'rwilson@example.com.au' },
    { name: "Sarah Brown", phone: "+33 6 12 34 56 78", email: 'sarah.brown@gmail.com' },
    { name: "David Martinez", phone: "+34 612 345 678", email: 'david.m@corporation.es' },
    { name: "Lisa Anderson", phone: "+1 212 555 7890", email: 'lisa.anderson@hotmail.com' },
    { name: "James Taylor", phone: "+49 151 12345678", email: 'james.taylor@company.de' },
    { name: "Jennifer Garcia", phone: "+1 408 555 1234", email: 'j.garcia@tech-firm.com' },
    { name: "Thomas Rodriguez", phone: "+39 312 345 6789", email: 'thomas.r@example.it' },
    { name: "Maria Hernandez", phone: "+52 55 1234 5678", email: 'maria.h@universidad.mx' },
    { name: "Daniel Lee", phone: "+82 10 1234 5678", email: 'daniel.lee@corp.kr' },
    { name: "Sophia Kim", phone: "+1 650 123 4567", email: 'sophia.kim@startup.io' },
    { name: "William Chen", phone: "+86 138 1234 5678", email: 'william.chen@business.cn' },
  ]);
  const [columnDefs] = useState([
    {
      field: "name",
    },
    { field: "phone" },
    { field: "email" },
  ]);

  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
      headerCheckbox: true,
    };
  }, []);

  return (
    <Stack height="100%">
      <SearchHeader title="Users" buttonText="Add User" />
      <SectionWrapper>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={rowSelection}
        />
      </SectionWrapper>
    </Stack>
  );
};

export default Users;
