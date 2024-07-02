import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const integraExploreStyles = makeStyles()((theme: Theme) => ({
  integraExploreContainer: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down(310 * 4)]: {
      paddingBottom: theme.spacing(18),
    },
  },
  searchContentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flexWrap: "nowrap",
    gap: theme.spacing(2),
  },
  sortContainer: {
    width: theme.spacing(75),
    height: "100%",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.info.main}`,
    borderRadius: theme.spacing(3),
    overflow: "hidden",
    flexWrap: "nowrap",
  },
  resultsContainer: {
    flex: 1,
    height: "100%",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.info.main}`,
    borderRadius: theme.spacing(3),
    overflow: "hidden",
    flexWrap: "nowrap",
  },
  actionRow: {
    marginBottom: theme.spacing(2),
  },
  searchContainer: {
    flex: 1,
    marginRight: theme.spacing(4),
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
}));
