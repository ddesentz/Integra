import * as React from "react";
import { panelItemStyles } from "./PanelItemStyles";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useAppSignals } from "../../../../common/AppContext";

interface IPanelItem {
  index: number;
  label: string;
}

const PanelItemComponent: React.FunctionComponent<IPanelItem> = ({
  index,
  label,
}) => {
  const { classes } = panelItemStyles();
  const { rootSignals } = useAppSignals();
  const isActive = rootSignals.datasetPath.value[index] === label;

  const handlePathSelection = () => {
    rootSignals.datasetPath.value = [
      ...rootSignals.datasetPath.value.slice(0, index),
      label,
    ];
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className={
        isActive ? classes.activePanelItemContainer : classes.panelItemContainer
      }
      onClick={handlePathSelection}
    >
      <Typography className={classes.panelItemLabel}>{label}</Typography>
      {isActive && (
        <FontAwesomeIcon icon={faChevronRight} className={classes.activeIcon} />
      )}
    </Grid>
  );
};

export const PanelItem = PanelItemComponent;
