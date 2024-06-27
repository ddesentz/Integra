import * as React from "react";
import { integraExploreStyles } from "./IntegraExploreStyles";

interface IIntegraExplore {}

const IntegraExploreComponent: React.FunctionComponent<
  IIntegraExplore
> = () => {
  const { classes } = integraExploreStyles();

  return <div className={classes.integraExploreContainer}>Explore</div>;
};

export const IntegraExplore = IntegraExploreComponent;
