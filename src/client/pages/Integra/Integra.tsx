import * as React from "react";
import { integraStyles } from "./IntegraStyles";
import { IntegraNav } from "../../components/IntegraNav/IntegraNav";
import { Grid } from "@mui/material";
import { IntegraHome } from "./Home/IntegraHome";
import { IntegraExplore } from "./Explore/IntegraExplore";
import { IntegraDatasets } from "./Datasets/IntegraDatasets";
import { useParams } from "react-router";

const PageSelect: Map<string | undefined, any> = new Map([
  [undefined, <IntegraHome />],
  ["explore", <IntegraExplore />],
  ["datasets", <IntegraDatasets />],
]);

interface IIntegra {}
const IntegraComponent: React.FunctionComponent<IIntegra> = () => {
  const { classes } = integraStyles();
  const params = useParams();

  const renderContent = () => {
    return PageSelect.get(params.page);
  };

  return (
    <div className={classes.integraContainer}>
      <IntegraNav />
      <Grid container direction="column" className={classes.contentContainer}>
        {renderContent()}
      </Grid>
    </div>
  );
};

export const Integra = IntegraComponent;
