import React, { FC, memo } from "react";

import { TableBody } from "@mui/material";

import { EmployeeItem } from "./EmployeeItem";
import { Employee } from "../../../../../types";

type EmployeesListPropsType = {
  employees: Employee[];
  selectedItems: string[];
  toggleEmployee: (id: string, value: boolean) => void;
  page: number;
  rowsPerPage: number;
};

const EmployeesList: FC<EmployeesListPropsType> = memo((props) => {
  const { employees, selectedItems, toggleEmployee, page, rowsPerPage } = props;

  return (
    <TableBody>
      {employees
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((employee) => {
          const { id } = employee;
          return (
            <EmployeeItem
              key={id}
              {...employee}
              isSelected={selectedItems.includes(id)}
              toggleEmployee={toggleEmployee}
            />
          );
        })}
    </TableBody>
  );
});

export { EmployeesList };
