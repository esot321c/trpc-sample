import { Tabs, Tab, useTheme, SxProps, Theme, useMediaQuery } from "@mui/material";
import { FC, ReactNode } from "react";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  sx?: SxProps<Theme>;
}

export const ContainedTabs: FC<StyledTabsProps> = ({ sx, ...props }) => {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const mergeSx = (defaultSx: SxProps<Theme>, newSx?: SxProps<Theme>) => {
    if (!newSx) return defaultSx;
    return (theme: Theme) => ({
      ...typeof defaultSx === 'function' ? defaultSx(theme) : defaultSx,
      ...typeof newSx === 'function' ? newSx(theme) : newSx,
    });
  };
  return (
    <Tabs
      scrollButtons="auto"
      allowScrollButtonsMobile
      variant="scrollable"
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
      sx={mergeSx({
        '& .MuiTabs-indicator': {
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
          maxWidth: 40,
          width: '100%',
          backgroundColor: theme.palette.secondary.main,
        },
        background: theme.palette.background.paper,
        borderRadius: '8px',
        border: `1px solid ${theme.palette.divider}`,
        '& .MuiTabs-flexContainer': {
          justifyContent: upMd ? 'center' : null
        },
      }, sx)}
      {...props}
    />
  );
};

interface StyledTabProps {
  label: string;
  sx?: SxProps<Theme>;
}

export const ContainedTab: FC<StyledTabProps> = ({ sx, ...props }) => {
  const theme = useTheme();

  const mergeSx = (defaultSx: SxProps<Theme>, newSx?: SxProps<Theme>) => {
    if (!newSx) return defaultSx;
    return (theme: Theme) => ({
      ...typeof defaultSx === 'function' ? defaultSx(theme) : defaultSx,
      ...typeof newSx === 'function' ? newSx(theme) : newSx,
    });
  };

  return (
    <Tab
      disableRipple
      sx={mergeSx({
        textTransform: 'none',
        fontWeight: 700,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary,
        '&.Mui-selected': {
          color: theme.palette.text.primary,
        },
        '&.Mui-focusVisible': {
          backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
      }, sx)}
      {...props}
    />
  );
};