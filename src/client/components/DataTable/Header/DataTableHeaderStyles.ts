import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const dataTableHeaderStyles = makeStyles()((theme: Theme) => ({
  dataTableHeaderContainer: {
    height: theme.spacing(10),
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark,
    borderTopLeftRadius: theme.spacing(3),
    borderTopRightRadius: theme.spacing(3),
  },
  pathWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: `calc(100% - ${theme.spacing(5)})`,
    overflow: "hidden",
    height: theme.spacing(6),
  },
  rootIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    cursor: "pointer",
  },
  breadCrumbContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    flexWrap: "nowrap",
    "&:last-of-type": {
      overflow: "visible",
    },
  },
  breadcrumbIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: `0 ${theme.spacing(2)}`,
    color: theme.palette.info.light,
  },
  breacrumbText: {
    fontSize: theme.spacing(4),
    color: theme.palette.info.light,
    cursor: "pointer",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  lastBreadcrumbText: {
    fontSize: theme.spacing(4),
    color: theme.palette.info.light,
    fontWeight: "bold",
    cursor: "pointer",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));
