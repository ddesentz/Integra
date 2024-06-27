import * as React from "react";
import { dataTableStyles } from "./DataTableStyles";
import { DataTableHeader } from "./Header/DataTableHeader";
import { Grid } from "@mui/material";
import { DataTablePanel } from "./Panel/DataTablePanel";

interface IDataTable {}

const DataTableComponent: React.FunctionComponent<IDataTable> = () => {
  const { classes } = dataTableStyles();
  const [dataPath, setDataPath] = React.useState<string[]>([
    "Live_POV",
    "Object 1",
  ]);

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      className={classes.dataTableContainer}
    >
      <DataTableHeader path={dataPath} />
      <Grid container direction="row" className={classes.dataPanelsContainer}>
        <DataTablePanel
          label="(root)"
          type="root"
          childLabel={dataPath.length > 0 ? dataPath[0] : undefined}
        />
        {dataPath.length > 0 && (
          <>
            {dataPath.map((item, index) => {
              return (
                <DataTablePanel
                  key={index}
                  label={item}
                  type={index % 2 ? "record" : "collection"}
                  childLabel={
                    index !== dataPath.length - 1
                      ? dataPath[index + 1]
                      : undefined
                  }
                />
              );
            })}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export const DataTable = DataTableComponent;
