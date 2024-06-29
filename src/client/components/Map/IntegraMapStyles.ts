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
}));
