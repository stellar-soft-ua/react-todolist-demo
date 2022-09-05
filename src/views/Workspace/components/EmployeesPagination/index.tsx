import React, { FC, memo } from "react";
import { TablePagination } from "@mui/material";

type EmployeesPaginationPropsType = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const EmployeesPagination: FC<EmployeesPaginationPropsType> = memo((props) => {
  const { count, rowsPerPage, page, handleChangeRowsPerPage, onPageChange } =
    props;

  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[5, 10, 25]}
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
});

export { EmployeesPagination };
