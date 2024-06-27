import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const integraStyles = makeStyles()((theme: Theme) => ({
  integraContainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    height: "100svh",
    overflow: "hidden",
    display: "flex",
  },
  contentContainer: {
    marginTop: theme.spacing(16),
    width: "100%",
    overflow: "auto",
    [theme.breakpoints.up(310 * 4)]: {
      marginLeft: theme.spacing(39),
    },
  },
}));
