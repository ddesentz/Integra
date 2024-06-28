import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const panelItemStyles = makeStyles()((theme: Theme) => ({
  panelItemContainer: {
    width: "100%",
    padding: `${theme.spacing(2)} 0`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.main + "66",
    },
  },
  activePanelItemContainer: {
    width: "100%",
    backgroundColor: theme.palette.primary.main + "AA",
    padding: `${theme.spacing(2)} 0`,
    cursor: "pointer",
  },
  panelItemLabel: {
    fontSize: theme.spacing(4),
    color: theme.palette.primary.contrastText,
    flex: 1,
    textAlign: "start",
    paddingLeft: theme.spacing(9),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  activeIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.primary.contrastText,
    paddingRight: theme.spacing(4),
  },
}));
