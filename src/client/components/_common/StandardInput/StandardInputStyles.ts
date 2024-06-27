import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const standardInputStyles = makeStyles()((theme: Theme) => ({
  standardInputContainer: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    "& .Mui-error": {
      border: `1px solid ${theme.palette.error.main}`,
      boxSizing: "border-box",
    },
  },
  textField: {
    flex: 1,
    width: "min-content",
    height: "100%",
    borderRadius: "inherit",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    fontSize: "inherit",
    "& > input": {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },
  },
}));
