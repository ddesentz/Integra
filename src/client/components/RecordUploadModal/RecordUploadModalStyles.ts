import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const recordUploadModalStyles = makeStyles()((theme: Theme) => ({
  recordUploadModalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadModal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    width: "90%",
  },
  uploadModalHeader: {
    borderBottom: `1px solid ${theme.palette.info.light}AA`,
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    boxSizing: "border-box",
  },
  uploadModalHeaderText: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(8),
    fontWeight: "bold",
    padding: `${theme.spacing(6)} ${theme.spacing(4)}`,
    width: "100%",
  },
  newDatasetInfoText: {
    color: theme.palette.success.main,
    fontSize: theme.spacing(4),
    padding: `${theme.spacing(0)} ${theme.spacing(4)}`,
  },
  jsonFormatSupportText: {
    color: theme.palette.info.light,
    fontSize: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  uploadModalContentContainer: {
    backgroundColor: theme.palette.background.paper,
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  },
  sectionHeaderText: {
    color: theme.palette.info.light,
    fontSize: theme.spacing(6),
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  divider: {
    borderBottom: `1px solid ${theme.palette.info.light}66`,
    paddingBottom: theme.spacing(6),
    marginBottom: theme.spacing(6),
    width: "100%",
  },
  actionButtonsContainer: {
    zIndex: 1,
    paddingBottom: theme.spacing(4),
  },
  actionIcon: {
    height: theme.spacing(4),
  },
  buttonWrapper: {
    width: theme.spacing(40),
    maxWidth: "40%",
  },
  autoCompleteWrapper: {
    width: "50%",
  },
  itemRenderer: {
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    width: "100%",
    cursor: "pointer",
  },
  editorWrapper: {
    display: "flex",
    width: `100%`,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.info.dark,
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.info.light}66`,
    boxSizing: "border-box",
  },
  editor: {},
  submitContainer: {
    gap: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
}));
