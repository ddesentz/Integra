import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const dataTableStyles = makeStyles()((theme: Theme) => ({
  dataTableContainer: {
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.info.main}`,
    borderRadius: theme.spacing(3),
    overflow: "hidden",
  },
  dataPanelsContainer: {
    flex: 1,
    flexWrap: "nowrap",
    transition: "transform 0.3s ease-in-out",
    "& > div:first-of-type": {
      borderBottomLeftRadius: theme.spacing(3),
    },
    "& > div:last-of-type": {
      borderBottomRightRadius: theme.spacing(3),
    },
  },
}));
