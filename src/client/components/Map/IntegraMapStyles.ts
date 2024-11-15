import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const integraMapStyles = makeStyles()((theme: Theme) => ({
  integraMapContainer: {
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.info.main}`,
    borderRadius: theme.spacing(3),
    overflow: "hidden",
    flexWrap: "nowrap",
  },
  timeSliderContainer: {
    position: "absolute",
    bottom: 0,
    width: `calc(100% - ${theme.spacing(2)})`,
    zIndex: 100,
    backgroundColor: theme.palette.background.default,
    margin: theme.spacing(1),
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
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
}));
