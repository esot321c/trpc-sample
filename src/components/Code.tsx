import React, { FC } from "react";
import { SxProps, Box, useTheme } from "@mui/material";

interface ICodeProps {
  sx?: SxProps;
  children: React.ReactNode;
}

const Code: FC<ICodeProps> = ({ sx, children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        p: "4px",
        borderRadius: "4px",
        fontFamily: "monospace",
        overflowX: "scroll",
        ...sx,
      }}
      component="code"
    >
      {children}
    </Box>
  );
};

export default Code;
