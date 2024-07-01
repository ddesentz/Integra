import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const standardAutocompleteStyles = makeStyles()((theme: Theme) => ({
  standardAutocompleteContainer: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  autocomplete: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  textField: {
    flex: 1,
    width: `calc(100% - ${theme.spacing(6)})`,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    fontSize: "inherit",
    "& .MuiInputLabel-shrink": {
      display: "none",
    },
    "& > div": {
      "&:before": {
        display: "none",
      },
      "&:after": {
        display: "none",
      },
    },
  },
  keyboardAutocompleteContainer: {
    position: "absolute",
    top: 0,
    left: 40,
    zIndex: 9000,
    flex: 1,
    width: `calc(100% - ${theme.spacing(10)})`,
    fontSize: "inherit",
    "& .MuiInputLabel-shrink": {
      display: "none",
    },
    "& > div": {
      "&:before": {
        display: "none",
      },
      "&:after": {
        display: "none",
      },
    },
  },
  keyboardBackButton: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9000,
    flex: 1,
    width: theme.spacing(10),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 0,
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
  },
  virtualWrapper: {
    display: "flex",
    height: "100%",
    "& > div": {
      overflow: "inherit !important",
      height: "100%",
      maxHeight: "unset",
    },
  },
  virtualPopper: {
    zIndex: 9999999,
    borderTop: `1px solid ${theme.palette.info.light}AA`,
    boxSizing: "border-box",
    "*::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.spacing(0),
    },
    "& > div": {
      height: "100%",
    },
    "& > div > div > div": {
      padding: `0 !important`,
    },
  },
  defaultItemRenderer: {
    boxSizing: "border-box",
    height: "100%",
    borderBottom: `1px solid ${theme.palette.info.light}11`,
    lineHeight: theme.spacing(6),
    padding: 0,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "pointer",
    paddingLeft: `${theme.spacing(3)} !important`,
    "& > p": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    "&.Mui-focused": {
      backgroundColor: `${theme.palette.primary.light}33 !important`,
    },
    "&[aria-selected=true]": {
      backgroundColor: `${theme.palette.primary.light}66 !important`,
      fontWeight: "bold",
    },
  },
}));
