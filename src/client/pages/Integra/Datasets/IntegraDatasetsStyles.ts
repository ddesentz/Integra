import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const integraDatasetsStyles = makeStyles()((theme: Theme) => ({
  integraDatasetsContainer: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down(310 * 4)]: {
      paddingBottom: theme.spacing(18),
    },
  },
  actionRow: {
    marginBottom: theme.spacing(2),
  },
  searchContainer: {
    flex: 1,
    maxWidth: theme.spacing(150),
  },
  searchIconAdornment: {
    paddingRight: theme.spacing(3),
  },
  toggleGroupButton: {
    width: theme.spacing(20),
    height: theme.spacing(10),
    "&.Mui-selected": {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.primary.light,
    },
  },
  toggleGroupIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  viewContainer: {
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
    borderRadius: theme.spacing(3),
    overflow: "hidden",
    flexWrap: "nowrap",
    gap: theme.spacing(2),
  },
}));
