import * as React from "react";
import { dataTableStyles } from "./DataTableStyles";
import { DataTableHeader } from "./Header/DataTableHeader";
import { Grid } from "@mui/material";
import { DataTablePanel } from "./Panel/DataTablePanel";
import { useAppSignals } from "../../common/AppContext";

interface IDataTable {}

const DataTableComponent: React.FunctionComponent<IDataTable> = () => {
  const { classes } = dataTableStyles();
  const { rootSignals } = useAppSignals();
  const collectionPath = rootSignals.collectionPath.value;

  const getTransformStyle = () => {
    if (collectionPath.length > 2) {
      return `translateX(-${(collectionPath.length - 2) * (100 / 4)}%)`;
    }
    return "translateX(0)";
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      className={classes.dataTableContainer}
    >
      <DataTableHeader />
      <Grid
        container
        direction="row"
        className={classes.dataPanelsContainer}
        style={{ transform: getTransformStyle() }}
      >
        <DataTablePanel index={0} path="(root)" type="root" />
        {collectionPath.map((item, index) => {
          return (
            <DataTablePanel
              index={index + 1}
              key={index}
              path={item}
              type={index % 2 ? "record" : "collection"}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export const DataTable = DataTableComponent;
