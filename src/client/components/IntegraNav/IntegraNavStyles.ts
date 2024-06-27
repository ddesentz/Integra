import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const integraNavStyles = makeStyles()((theme: Theme) => ({
  integraNavContainer: {},
  appBarContainer: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up(310 * 4)]: {
      height: "100%",
      width: theme.spacing(39),
      zIndex: 200,
      left: 0,
      backgroundImage: `linear-gradient(270deg, ${theme.palette.primary.dark}cc, ${theme.palette.secondary.contrastText}11)`,
    },
    [theme.breakpoints.down(310 * 4)]: {
      top: "auto",
      bottom: 0,
      backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.dark}cc, ${theme.palette.secondary.contrastText}11)`,
    },
  },
  toolbarContainer: {
    overflow: "hidden",
    [theme.breakpoints.up(310 * 4)]: {
      width: "100%",
      padding: "0 !important",
    },
  },
  headerContainer: {
    [theme.breakpoints.up(310 * 4)]: {
      height: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      zIndex: 2,
      left: 0,
      gap: theme.spacing(5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      height: theme.spacing(16),
    },
  },
  logoContainer: {
    height: theme.spacing(16),
    width: `100%`,
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.primary.light}33`,
  },
  logo: {
    height: theme.spacing(12),
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    lineHeight: theme.spacing(12),
    fontSize: theme.spacing(8),
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  navButton: {
    display: "flex",
    [theme.breakpoints.up(310 * 4)]: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingLeft: theme.spacing(5.2),
      gap: theme.spacing(3),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(12),
      flexDirection: "column",
      gap: theme.spacing(1),
    },
    "&[aria-selected=true]": {
      "& > div > div > svg": {
        fill: `${theme.palette.primary.light} !important`,
      },
      "& > p": {
        color: theme.palette.primary.light,
      },
    },
  },
  navButtonLabel: {
    color: theme.palette.info.light,
    [theme.breakpoints.up(310 * 4)]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(2.5),
    },
  },
  avatarButton: {
    display: "flex",
    gap: theme.spacing(2),
    [theme.breakpoints.up(310 * 4)]: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: theme.spacing(3),
      paddingLeft: theme.spacing(5.2),
    },
    [theme.breakpoints.down(310 * 4)]: {
      width: theme.spacing(12),
      flexDirection: "column",
      gap: theme.spacing(1),
    },
    "&[aria-selected=true]": {
      "& > p ": {
        color: theme.palette.primary.light,
      },
    },
  },
  navIcon: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    fill: theme.palette.info.light,
  },
  headerText: {
    fontSize: theme.spacing(6),
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
  },
  contentContainer: {
    marginTop: theme.spacing(16),
    [theme.breakpoints.up(310 * 4)]: {
      padding: theme.spacing(20),
      paddingTop: theme.spacing(16),
    },
    [theme.breakpoints.down(310 * 4)]: {
      padding: theme.spacing(6),
      paddingTop: theme.spacing(8),
    },
  },
  userIcon: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  userDisplayName: {
    fontSize: theme.spacing(6),
    color: theme.palette.primary.contrastText,
    width: `calc(100% - ${theme.spacing(10)})`,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "start",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down(310 * 4)]: {
      fontSize: theme.spacing(5),
    },
  },
}));
