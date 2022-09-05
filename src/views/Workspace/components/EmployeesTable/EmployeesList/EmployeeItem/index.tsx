import React, { FC, memo } from "react";

import { Checkbox, TableCell, TableRow } from "@mui/material";

import { Employee } from "../../../../../../types";

type EmployeeItemPropsType = Employee & {
  isSelected?: boolean;
  toggleEmployee: (id: string, value: boolean) => void;
};

const EmployeeItem: FC<EmployeeItemPropsType> = memo((props) => {
  const { birthdate, jobTitle, name, salary, isSelected, toggleEmployee, id } =
    props;

  const handleToggleCheckbox = () => {
      toggleEmployee(id, !isSelected);
  };

  return (
    <TableRow hover onClick={handleToggleCheckbox}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isSelected}
        />
      </TableCell>
      <TableCell component="th">{name}</TableCell>
      <TableCell>{birthdate}</TableCell>
      <TableCell>{jobTitle}</TableCell>
      <TableCell align="right">{salary}</TableCell>
    </TableRow>
  );
});

export { EmployeeItem };
