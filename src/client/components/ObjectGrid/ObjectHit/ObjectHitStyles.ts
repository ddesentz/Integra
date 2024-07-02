import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const objectHitStyles = makeStyles()((theme: Theme) => ({
  objectHitContainer: {
    height: "100%",
    flexWrap: "nowrap",
    cursor: "pointer",
  },
  objectHeaderContainer: {
    height: theme.spacing(16),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: theme.spacing(3),
    borderTopRightRadius: theme.spacing(3),
  },
  focusHeaderContainer: {
    height: theme.spacing(16),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    borderTopLeftRadius: theme.spacing(3),
    borderTopRightRadius: theme.spacing(3),
    "& > p": {
      color: theme.palette.secondary.contrastText,
      fontWeight: "bold",
    },
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
    display: "flex",
  },
  actionIcon: {
    height: theme.spacing(3),
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
  editorWrapper: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    overflow: "auto",
  },
  linkToRecordText: {
    color: theme.palette.info.light,
    textDecoration: "underline",
    fontSize: theme.spacing(3),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "pointer",
    maxWidth: `calc(100% - ${theme.spacing(40)})`,
    textAlign: "start",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
}));
