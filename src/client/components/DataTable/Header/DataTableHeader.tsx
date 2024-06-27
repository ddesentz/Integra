import * as React from "react";
import { dataTableHeaderStyles } from "./DataTableHeaderStyles";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { integraTheme } from "../../../common/Theme";
import { useAppSignals } from "../../../common/AppContext";

interface IDataTableHeader {}

const DataTableHeaderComponent: React.FunctionComponent<
  IDataTableHeader
> = ({}) => {
  const { classes } = dataTableHeaderStyles();
  const { rootSignals } = useAppSignals();
  const path = rootSignals.collectionPath.value;

  const handlePathSelection = (index: number, label: string) => {
    if (index === 0) {
      rootSignals.collectionPath.value = [];
      return;
    }
    rootSignals.collectionPath.value = [
      ...rootSignals.collectionPath.value.slice(0, index - 1),
      label,
    ];
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      className={classes.dataTableHeaderContainer}
    >
      <FontAwesomeIcon
        icon={faHome}
        className={classes.rootIcon}
        style={{
          color:
            path.length > 0
              ? integraTheme.palette.info.light
              : integraTheme.palette.primary.contrastText,
        }}
        onClick={() => handlePathSelection(0, "")}
      />
      {path.length > 0 && (
        <>
          {path.map((item, index) => {
            return (
              <div key={index} className={classes.breadCrumbContainer}>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={classes.breadcrumbIcon}
                />
                <Typography
                  className={
                    index === path.length - 1
                      ? classes.lastBreadcrumbText
                      : classes.breacrumbText
                  }
                  onClick={() => handlePathSelection(index + 1, item)}
                >
                  {item}
                </Typography>
              </div>
            );
          })}
        </>
      )}
    </Grid>
  );
};

export const DataTableHeader = DataTableHeaderComponent;
