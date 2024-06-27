import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const dataTablePanelStyles = makeStyles()((theme: Theme) => ({
  dataTablePanelContainer: {
    flex: 1,
    boxSizing: "border-box",
    borderLeft: `1px solid ${theme.palette.info.main}`,
    "&:first-of-type": {
      borderLeft: "none",
    },
  },
  panelHeader: {
    height: theme.spacing(10),
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    flexWrap: "nowrap",
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
