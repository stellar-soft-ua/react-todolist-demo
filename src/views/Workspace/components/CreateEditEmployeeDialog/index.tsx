import React, { FC, memo, useEffect } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { Employee, NewEmployee } from "../../../../types";
import { Moment } from "moment";
import { preventNumbers } from "../../../../utils/input";

type CreateEditEmployeeDialogPropsType = {
  open: boolean;
  handleClose: () => void;
  handleCreateEmployee: (newEmployee: NewEmployee, id?: string) => void;
  employee?: Employee;
};

const CreateEditEmployeeDialog: FC<CreateEditEmployeeDialogPropsType> = memo(
  (props) => {
    const { handleClose, open, handleCreateEmployee, employee } = props;
    const { id, name } = employee || {};
    const isUpdate = !!employee;
    const { control, handleSubmit, reset } = useForm<NewEmployee>({
      defaultValues: {
        name: "",
        birthdate: null,
        salary: 0,
        jobTitle: "",
      },
    });

    useEffect(() => {
      if (!open) {
        reset();
      }
    }, [open, reset]);

    useEffect(() => {
      if (employee) {
        const { birthdate, jobTitle, name, salary } = employee;
        reset({
          birthdate,
          jobTitle,
          name,
          salary,
        });
      } else {
        reset(undefined);
      }
    }, [employee, reset]);

    const onSubmit = (newEmployee: NewEmployee) => {
      handleCreateEmployee(newEmployee, id);
    };

    return (
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {isUpdate ? `Update employee ${name}` : "Create new employee"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Please, fill all fields:</DialogContentText>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  onKeyDown={preventNumbers}
                  required
                  id="name"
                  label="Full name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              )}
            />
            <Controller
              name="birthdate"
              control={control}
              render={({ field: { onChange, value, ...otherFields } }) => {
                return (
                  <DatePicker
                    label="Birthdate"
                    value={value}
                    onChange={(d: Moment | null) => {
                      onChange(d ? d.format("L") : d);
                    }}
                    inputFormat={"L"}
                    renderInput={(params) => (
                      <TextField
                        {...otherFields}
                        {...params}
                        margin="dense"
                        required
                        id="birthdate"
                        fullWidth
                        variant="standard"
                      />
                    )}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="jobTitle"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    margin="dense"
                    onKeyDown={preventNumbers}
                    required
                    id="jobTitle"
                    label="Job title"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="salary"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    margin="dense"
                    required
                    id="salary"
                    label="Salary"
                    type="number"
                    fullWidth
                    variant="standard"
                  />
                );
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{isUpdate ? "Update" : "Create"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
);

export { CreateEditEmployeeDialog };
