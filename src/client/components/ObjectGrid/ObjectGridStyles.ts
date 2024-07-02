import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const objectGridStyles = makeStyles()((theme: Theme) => ({
  objectGridContainer: {
    width: "100%",
    height: "100%",
  },
  objectItemWrapper: {
    width: `calc(100% - ${theme.spacing(7)})`,
    height: `calc(100% - ${theme.spacing(6)})`,
    padding: theme.spacing(3),
    paddingRight: theme.spacing(4),
  },
  objectItemContent: {
    height: "100%",
    width: "100%",
    border: `1px solid ${theme.palette.info.main}`,
    borderRadius: theme.spacing(3),
    boxSizing: "border-box",
    display: "block",
  },
  emptyContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    height: theme.spacing(30),
    color: theme.palette.info.light + "66",
  },
  emptyText: {
    paddingTop: theme.spacing(6),
    fontSize: theme.spacing(8),
    color: theme.palette.info.light + "AA",
  },
}));
