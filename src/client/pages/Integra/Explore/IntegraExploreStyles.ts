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
  objectWrapper: {
    height: "100%",
    flexWrap: "nowrap",
  },
  objectHeaderContainer: {
    height: theme.spacing(16),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: theme.spacing(3),
    borderTopRightRadius: theme.spacing(3),
  },
  objectFlag: {
    height: "100%",
    opacity: 0.7,
  },
  unknownFlag: {
    height: "100%",
    aspectRatio: "3/2",
    fontSize: theme.spacing(10),
    fontWeight: "bold",
  },
  callsignText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  actionContainer: {
    width: "100%",
    padding: theme.spacing(2),
  },
  objectItemActionDivider: {
    width: "100%",
    borderBottom: `1px solid ${theme.palette.info.main}`,
    marginBottom: theme.spacing(2),
    boxSizing: "border-box",
  },
  actionButtonWrapper: {
    flex: 1,
    maxWidth: theme.spacing(40),
  },
  hitCellsContainer: {
    gap: theme.spacing(3),
    padding: theme.spacing(1),
    height: `calc(100% - ${theme.spacing(32)})`,
    overflow: "auto",
  },
  hitCell: {
    display: "flex",
    maxWidth: `calc(50% - ${theme.spacing(3)})`,
    overflow: "hidden",
    flexWrap: "wrap",
  },
  hitLabelText: {
    fontSize: theme.spacing(3),
    fontWeight: "bold",
    color: theme.palette.primary.light,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
  },
  hitValueText: {
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    color: theme.palette.info.light,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
    "& em": {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.background.default,
    },
  },
  defaultDescriptiveLabelText: {
    width: "100%",
    fontSize: theme.spacing(4),
    fontWeight: "bold",
    color: theme.palette.primary.contrastText,
    borderBottom: `1px solid ${theme.palette.info.main}`,
    paddingBottom: theme.spacing(2),
    boxSizing: "border-box",
  },
}));
