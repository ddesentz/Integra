import * as React from "react";
import { integraContentHeaderStyles } from "./IntegraContentHeaderStyles";
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { integraTheme } from "../../../common/Theme";

interface IIntegraContentHeader {
  title: string;
}

const IntegraContentHeaderComponent: React.FunctionComponent<
  IIntegraContentHeader
> = ({ title }) => {
  const { classes } = integraContentHeaderStyles();
  const params = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(integraTheme.breakpoints.down(310 * 4));

  return (
    <AppBar className={classes.integraContentHeaderContainer}>
      <Toolbar>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent={isMobile ? "center" : "flex-start"}
          className={classes.actionContainer}
        >
          <Typography className={classes.titleText}>{title}</Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export const IntegraContentHeader = IntegraContentHeaderComponent;
