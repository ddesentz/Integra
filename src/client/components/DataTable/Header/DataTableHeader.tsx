import * as React from "react";
import { dataTableHeaderStyles } from "./DataTableHeaderStyles";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { integraTheme } from "../../../common/Theme";

interface IDataTableHeader {
  path: string[];
}

const DataTableHeaderComponent: React.FunctionComponent<IDataTableHeader> = ({
  path = [],
}) => {
  const { classes } = dataTableHeaderStyles();

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
