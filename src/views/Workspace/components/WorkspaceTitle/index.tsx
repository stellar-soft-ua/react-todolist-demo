import React, { FC, memo } from "react";

import { Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

type WorkspaceTitlePropsType = {
  showEdit: boolean;
  showDelete: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
};

const WorkspaceTitle: FC<WorkspaceTitlePropsType> = memo((props) => {
  const { showEdit, showDelete, handleDelete, handleEdit } = props;

  return (
    <Toolbar disableGutters>
      <Typography variant="h5" sx={{ pl: 2, pr: 2 }}>
        Employees
      </Typography>
      <Box sx={{ display: "flex", ml: "auto" }}>
        {showEdit && (
          <Tooltip title="Edit" onClick={handleEdit}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {showDelete && (
          <Tooltip title="Delete" sx={{ ml: 1 }}>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Toolbar>
  );
});

export { WorkspaceTitle };
