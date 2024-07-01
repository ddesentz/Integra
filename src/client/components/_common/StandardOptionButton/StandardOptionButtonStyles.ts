import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const standardOptionButtonStyles = makeStyles()((theme: Theme) => ({
  standardOptionButtonContainer: {
    width: "100%",
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
    borderRadius: theme.spacing(2),
    display: "flex",
    border: `1px solid ${theme.palette.info.light}66`,
    "& .MuiButton-endIcon": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  optionButtonText: {
    width: `calc(100% - ${theme.spacing(12)})`,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: theme.palette.primary.contrastText,
    fontSize: "0.875rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  optionsPopover: {
    "& .MuiPopover-paper": {
      backgroundColor: theme.palette.background.default,
      backgroundImage: "unset",
      borderRadius: theme.spacing(1),
      "*::-webkit-scrollbar-track": {
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.spacing(0),
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(2),
        border: `0.3em solid ${theme.palette.background.default}`,
      },
      "*::-webkit-scrollbar-corner": {
        backgroundColor: theme.palette.background.default,
      },
    },
  },
  optionText: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default,
    cursor: "pointer",
    borderBottom: `1px solid ${theme.palette.background.paper}AA`,
    "&:hover": {
      backgroundColor: theme.palette.background.paper + "EE",
    },
  },
  optionIcon: {
    height: theme.spacing(4),
  },
  selectedOptionText: {
    width: "100%",
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper + "AA",
    color: theme.palette.primary.light,
    cursor: "pointer",
    fontWeight: "bold",
    borderBottom: `1px solid ${theme.palette.background.paper}AA`,
    "&:hover": {
      backgroundColor: theme.palette.background.paper + "AA",
    },
  },
}));
