import * as React from "react";
import { integraHomeStyles } from "./IntegraHomeStyles";
import { IntegraContentHeader } from "../ContentHeader/IntegraContentHeader";
import { Grid } from "@mui/material";

interface IIntegraHome {}

const IntegraHomeComponent: React.FunctionComponent<IIntegraHome> = () => {
  const { classes } = integraHomeStyles();

  return (
    <>
      <IntegraContentHeader title="Home" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <div>HOME</div>
      </Grid>
    </>
  );
};

export const IntegraHome = IntegraHomeComponent;
