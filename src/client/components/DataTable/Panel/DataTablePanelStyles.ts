import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const dataTablePanelStyles = makeStyles()((theme: Theme) => ({
  dataTablePanelContainer: {
    flex: 1,
    boxSizing: "border-box",
    borderRight: `1px solid ${theme.palette.info.main}`,
    minWidth: "calc(100% / 4)",
    maxWidth: "calc(100% / 2)",
    "&:last-of-type:not(:only-of-type)": {
      minWidth: "calc(100% / 2)",
    },
  },
  panelHeader: {
    height: theme.spacing(10),
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    flexWrap: "nowrap",
  },
  detailWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  typeIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    color: theme.palette.info.light,
    marginRight: theme.spacing(2),
  },
  labelText: {
    fontSize: theme.spacing(4),
    color: theme.palette.info.light,
  },
}));
