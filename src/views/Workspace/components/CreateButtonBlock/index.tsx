import { FC, memo } from "react";

import { Box, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

type CreateButtonBlockPropsType = {
  handleCreateClick: () => void;
};

const CreateButtonBlock: FC<CreateButtonBlockPropsType> = memo((props) => {
  const { handleCreateClick } = props;

  return (
    <Box
      sx={{ display: "flex", position: "fixed", right: "24px", bottom: "24px" }}
    >
      <Fab color="primary" onClick={handleCreateClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
});

export { CreateButtonBlock };
