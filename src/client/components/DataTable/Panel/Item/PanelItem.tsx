import * as React from "react";
import { panelItemStyles } from "./PanelItemStyles";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface IPanelItem {
  label: string;
  isActive: boolean;
}

const PanelItemComponent: React.FunctionComponent<IPanelItem> = ({
  label,
  isActive = false,
}) => {
  const { classes } = panelItemStyles();

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className={
        isActive ? classes.activePanelItemContainer : classes.panelItemContainer
      }
    >
      <Typography className={classes.panelItemLabel}>{label}</Typography>
      {isActive && (
        <FontAwesomeIcon icon={faChevronRight} className={classes.activeIcon} />
      )}
    </Grid>
  );
};

export const PanelItem = PanelItemComponent;
