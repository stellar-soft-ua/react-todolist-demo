import React, { FC, memo } from "react";
import { Table, TableContainer } from "@mui/material";
import { EmployeesHead } from "./EmployeesHead";
import { EmployeesList } from "./EmployeesList";
import { Employee } from "../../../../types";

type EmployeesTablePropsType = {
  handleSelectAll: (value: boolean) => void;
  isSelectedAll: boolean;
  employees: Employee[];
  selectedEmployeesIds: string[];
  toggleEmployee: (id: string, value: boolean) => void;
  page: number;
  rowsPerPage: number;
};

const EmployeesTable: FC<EmployeesTablePropsType> = memo((props) => {
  const {
    employees,
    toggleEmployee,
    selectedEmployeesIds,
    handleSelectAll,
    isSelectedAll,
    page,
    rowsPerPage,
  } = props;

  return (
    <TableContainer>
      <Table>
        <EmployeesHead
          toggleSelectedAll={handleSelectAll}
          isSelected={isSelectedAll}
        />
        <EmployeesList
          employees={employees}
          rowsPerPage={rowsPerPage}
          page={page}
          selectedItems={selectedEmployeesIds}
          toggleEmployee={toggleEmployee}
        />
      </Table>
    </TableContainer>
  );
});

export { EmployeesTable };
