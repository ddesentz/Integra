import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const standardButtonStyles = makeStyles()((theme: Theme) => ({
  primaryButtonContainer: {
    width: "100%",
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    position: "sticky",
    overflow: "hidden",
    flexShrink: 0,
    borderRadius: theme.spacing(2),
    display: "flex",
    border: `1px solid ${theme.palette.info.light}66`,
  },
  actionButtonContainer: {
    width: "100%",
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    position: "sticky",
    overflow: "hidden",
    flexShrink: 0,
    borderRadius: theme.spacing(2),
    display: "flex",
    border: `1px solid ${theme.palette.info.light}66`,
    backgroundColor: theme.palette.primary.light + "66",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
