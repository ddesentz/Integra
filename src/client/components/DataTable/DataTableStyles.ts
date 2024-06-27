import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const dataTableStyles = makeStyles()((theme: Theme) => ({
  dataTableContainer: {
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.info.main}`,
    borderRadius: theme.spacing(3),
  },
  dataPanelsContainer: {
    flex: 1,
    "& > div:first-child": {
      borderBottomLeftRadius: theme.spacing(3),
    },
    "& > div:last-child": {
      borderBottomRightRadius: theme.spacing(3),
    },
  },
}));
