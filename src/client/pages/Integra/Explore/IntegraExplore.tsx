import * as React from "react";
import { integraExploreStyles } from "./IntegraExploreStyles";
import { IntegraContentHeader } from "../ContentHeader/IntegraContentHeader";
import { Grid } from "@mui/material";

interface IIntegraExplore {}

const IntegraExploreComponent: React.FunctionComponent<
  IIntegraExplore
> = () => {
  const { classes } = integraExploreStyles();

  return (
    <>
      <IntegraContentHeader title="Explore" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <div>Explore</div>
      </Grid>
    </>
  );
};

export const IntegraExplore = IntegraExploreComponent;
