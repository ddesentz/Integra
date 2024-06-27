import * as React from "react";
import { dataTablePanelStyles } from "./DataTablePanelStyles";
import { Grid, Typography } from "@mui/material";
import {
  faDatabase,
  faFile,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PanelItem } from "./Item/PanelItem";

interface IDataTablePanel {
  label: string;
  type: string;
  childLabel?: string | undefined;
}

const DataTablePanelComponent: React.FunctionComponent<IDataTablePanel> = ({
  label,
  type,
  childLabel = undefined,
}) => {
  const { classes } = dataTablePanelStyles();
  const [items, setItems] = React.useState<string[]>([
    "Item 1",
    "Item 2",
    "Item 3",
    "Object 1",
  ]);

  const renderTypeIcon = () => {
    let icon = faDatabase;
    if (type === "collection") {
      icon = faFolder;
    } else if (type === "record") {
      icon = faFile;
    }

    return <FontAwesomeIcon icon={icon} className={classes.typeIcon} />;
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      className={classes.dataTablePanelContainer}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.panelHeader}
      >
        {renderTypeIcon()}
        <Typography className={classes.labelText}>{label}</Typography>
      </Grid>
      {items.map((item, index) => {
        return (
          <PanelItem
            key={index}
            label={item}
            isActive={childLabel && childLabel === item}
          />
        );
      })}
    </Grid>
  );
};

export const DataTablePanel = DataTablePanelComponent;
