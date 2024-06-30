import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const timeControllerStyles = makeStyles()((theme: Theme) => ({
  timeControllerContainer: {
    position: "absolute",
    bottom: 0,
    width: `calc(100% - ${theme.spacing(2)})`,
    zIndex: 100,
    backgroundColor: theme.palette.background.default + "CC",
    margin: theme.spacing(1),
    borderRadius: theme.spacing(2),
    padding: `${theme.spacing(3)} ${theme.spacing(6)}`,
  },
  rangeTimestampText: {
    display: "flex",
    flexShrink: 1,
    fontSize: theme.spacing(4),
    color: theme.palette.primary.contrastText,
  },
  timeActionButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  mainTimeActionIcon: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: `0 ${theme.spacing(1)}`,
    cursor: "pointer",
  },
  secondaryTimeActionIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: `0 ${theme.spacing(2)}`,
    cursor: "pointer",
  },
  timeConrollerSlider: {
    color: theme.palette.primary.light,
    marginBottom: 0,
    marginTop: theme.spacing(2),
    "& .MuiSlider-markLabel": {
      display: "none",
    },
    "& .MuiSlider-mark": {
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
}));
