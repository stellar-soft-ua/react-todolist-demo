import React, { FC, memo } from "react";
import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";

type EmployeesHeadPropsType = {
  isSelected: boolean;
  toggleSelectedAll: (value: boolean) => void;
};

const EmployeesHead: FC<EmployeesHeadPropsType> = memo((props) => {
  const { isSelected, toggleSelectedAll } = props;

  const handleSelectAll = (event: unknown, value: boolean) => {
    toggleSelectedAll(value);
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={isSelected} onChange={handleSelectAll} />
        </TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Birthdate</TableCell>
        <TableCell>Job title</TableCell>
        <TableCell align="right">Salary</TableCell>
      </TableRow>
    </TableHead>
  );
});

export { EmployeesHead };
