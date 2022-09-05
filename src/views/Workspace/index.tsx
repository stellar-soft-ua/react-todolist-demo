import React, { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { Box, Container, Paper } from "@mui/material";

import { Employee, NewEmployee } from "../../types";
import { EmployeesPagination } from "./components/EmployeesPagination";
import { WorkspaceTitle } from "./components/WorkspaceTitle";
import { DeleteDialog } from "./components/DeleteDialog";
import { CreateEditEmployeeDialog } from "./components/CreateEditEmployeeDialog";
import { EmployeesTable } from "./components/EmployeesTable";
import { CreateButtonBlock } from "./components/CreateButtonBlock";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Workspace = () => {
  const [employees, setEmployees] = useLocalStorage<Employee>("employees");
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [updatedEmployee, setUpdatedEmployee] = useState<Employee | undefined>(
    undefined
  );
  const [openCreateEditDialog, setOpenCreateEditDialog] =
    useState<boolean>(false);
  const [selectedEmployeesIds, setSelectedEmployeesIds] = useState<string[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const showEdit = selectedEmployeesIds.length === 1;
  const showDelete = selectedEmployeesIds.length >= 1;
  const isSelectedAll = selectedEmployeesIds.length === employees.length;

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const handleToggleSelectEmployee = useCallback(
    (id: string, value: boolean) => {
      if (!value) {
        setSelectedEmployeesIds((prevState) => {
          return prevState.filter((itemId) => {
            return itemId !== id;
          });
        });
      } else {
        setSelectedEmployeesIds((prevState) => {
          return [...prevState, id];
        });
      }
    },
    []
  );

  const handleSelectAll = useCallback(
    (value: boolean) => {
      if (value) {
        const allEmployeesIds = employees.map(({ id }) => id);
        setSelectedEmployeesIds(allEmployeesIds);
      } else {
        setSelectedEmployeesIds([]);
      }
    },
    [employees]
  );

  const handleDeleteEmployees = useCallback(() => {
    setOpenDeleteDialog(true);
  }, []);

  const handleCreateEmployee = useCallback(() => {
    setOpenCreateEditDialog(true);
  }, []);

  const handleEditEmployee = useCallback(() => {
    const editedEmployee = employees.find((employee) => {
      return employee.id === selectedEmployeesIds[0];
    });
    setUpdatedEmployee(editedEmployee);
    setOpenCreateEditDialog(true);
  }, [employees, selectedEmployeesIds]);

  const handleCloseDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(false);
  }, []);

  const handleCloseCreateEditDialog = useCallback(() => {
    setOpenCreateEditDialog(false);
    setUpdatedEmployee(undefined);
  }, []);

  const handleAcceptDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(false);
    setSelectedEmployeesIds([]);
    setEmployees((prevState) => {
      return prevState.filter((employee) => {
        return !selectedEmployeesIds.includes(employee.id);
      });
    });
  }, [selectedEmployeesIds, setEmployees]);

  const handleCreateOrUpdateEmployee = useCallback(
    (newEmployee: NewEmployee, updatedId?: string) => {
      if (!updatedId) {
        const employee: Employee = { ...newEmployee, id: uuid() };
        setEmployees((prevState) => {
          return [...prevState, employee];
        });
      } else {
        const updatedEmployees: Employee[] = employees.map((emp) => {
          if (emp.id === updatedId) {
            return {
              ...emp,
              ...newEmployee,
            };
          }
          return emp;
        });
        setEmployees(updatedEmployees);
      }
      setOpenCreateEditDialog(false);
      setUpdatedEmployee(undefined);
      setSelectedEmployeesIds([]);
    },
    [employees, setEmployees]
  );

  return (
    <Box
      sx={{ minHeight: "100vh", backgroundColor: "#0a1929", display: "flex" }}
    >
      <Container maxWidth="lg">
        <Paper sx={{ width: "100%", mb: 2, mt: 6, p: 3 }}>
          <WorkspaceTitle
            showEdit={showEdit}
            showDelete={showDelete}
            handleEdit={handleEditEmployee}
            handleDelete={handleDeleteEmployees}
          />
          <EmployeesTable
            employees={employees}
            selectedEmployeesIds={selectedEmployeesIds}
            isSelectedAll={isSelectedAll}
            handleSelectAll={handleSelectAll}
            toggleEmployee={handleToggleSelectEmployee}
            page={page}
            rowsPerPage={rowsPerPage}
          />
          <EmployeesPagination
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            count={employees.length}
          />
          <DeleteDialog
            count={selectedEmployeesIds.length}
            open={openDeleteDialog}
            handleClose={handleCloseDeleteDialog}
            handleAccept={handleAcceptDeleteDialog}
          />
          <CreateEditEmployeeDialog
            open={openCreateEditDialog}
            handleClose={handleCloseCreateEditDialog}
            handleCreateEmployee={handleCreateOrUpdateEmployee}
            employee={updatedEmployee}
          />
          <CreateButtonBlock handleCreateClick={handleCreateEmployee} />
        </Paper>
      </Container>
    </Box>
  );
};

export { Workspace };
