import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const integraContentHeaderStyles = makeStyles()((theme: Theme) => ({
  integraContentHeaderContainer: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.contrastText,
    backgroundImage: `linear-gradient(${theme.palette.secondary.contrastText}11, ${theme.palette.primary.dark}cc)`,
    zIndex: 100,
    justifyContent: "space-between",
    [theme.breakpoints.up(310 * 4)]: {
      paddingLeft: theme.spacing(39),
    },
  },
  actionContainer: {
    height: theme.spacing(16),
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    fontSize: theme.spacing(8),
    lineHeight: theme.spacing(16),
    fontWeight: "bold",
    color: theme.palette.info.light,
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(6),
    },
  },
}));
