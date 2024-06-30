import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const dataTablePanelStyles = makeStyles()((theme: Theme) => ({
  dataTablePanelContainer: {
    boxSizing: "border-box",
    borderRight: `1px solid ${theme.palette.info.main}`,
    minWidth: "calc(100% / 4)",
    maxWidth: "calc(100% / 2)",
    flexWrap: "nowrap",
    overflowX: "hidden",
    overflowY: "auto",
    height: "100%",
    "&:last-of-type:not(:only-of-type)": {
      minWidth: "calc(1px + (100% / 2))",
    },
  },
  mapDataTablePanelContainer: {
    boxSizing: "border-box",
    borderRight: `1px solid ${theme.palette.info.main}`,
    minWidth: "calc(100% / 3)",
    maxWidth: "calc(2 * (100% / 3))",
    flexWrap: "nowrap",
    overflowX: "hidden",
    overflowY: "auto",
    height: "100%",
    "&:last-of-type:not(:only-of-type)": {
      minWidth: "calc(1px + (2 * (100% / 3)))",
    },
  },
  panelHeader: {
    height: theme.spacing(10),
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    flexWrap: "nowrap",
    boxSizing: "border-box",
    borderBottom: `1px solid ${theme.palette.info.light}AA`,
  },
  detailWrapper: {
    display: "flex",
    flexDirection: "row",
    width: `calc(100% - ${theme.spacing(7)})`,
  },
  typeIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    color: theme.palette.info.light,
    marginRight: theme.spacing(2),
    cursor: "pointer",
  },
  actionIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    color: theme.palette.info.light,
    marginLeft: theme.spacing(2),
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  labelText: {
    fontSize: theme.spacing(4),
    color: theme.palette.info.light,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "start",
    width: `calc(100% - ${theme.spacing(7)})`,
  },
  loadingrecordContentContainer: {
    display: "flex",
    maxHeight: "30%",
    width: "100%",
    boxSizing: "border-box",
    borderBottom: `1px solid ${theme.palette.info.main}AA`,
    padding: theme.spacing(10),
  },
  recordContentContainer: {
    maxHeight: "30%",
    width: "100%",
    boxSizing: "border-box",
    borderBottom: `1px solid ${theme.palette.info.main}AA`,
    paddingBottom: theme.spacing(10),
  },
  jsonViewerContainer: {
    paddingLeft: theme.spacing(9),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(11)})`,
    "& > .json-view": {
      display: "flex",
      flexWrap: "nowrap",
    },
  },
  loadingContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > span": {
      color: theme.palette.info.light,
    },
  },
  contentScrollContainer: {
    width: "100%",
    maxHeight: `calc(100% - ${theme.spacing(10)})`,
    overflow: "hidden",
    height: "100%",
    "& > div": {
      "& > div": {
        scrollBehavior: "smooth",
      },
    },
  },
}));
