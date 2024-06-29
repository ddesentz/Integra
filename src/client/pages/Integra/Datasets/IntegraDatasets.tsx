import * as React from "react";
import { integraDatasetsStyles } from "./IntegraDatasetsStyles";
import { IntegraContentHeader } from "../ContentHeader/IntegraContentHeader";
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { StandardInput } from "../../../components/_common/StandardInput/StandardInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMapLocationDot,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "../../../components/DataTable/DataTable";
import { IntegraMap } from "../../../components/Map/IntegraMap";
import { useAppSignals } from "../../../common/AppContext";

interface IIntegraDatasets {}

const IntegraDatasetsComponent: React.FunctionComponent<
  IIntegraDatasets
> = () => {
  const { classes } = integraDatasetsStyles();
  const { rootSignals } = useAppSignals();
  const [searchValue, setSearchValue] = React.useState<string>("");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newViewType: string
  ) => {
    if (newViewType === null) return;
    rootSignals.viewMap.value = newViewType === "map";
  };

  return (
    <>
      <IntegraContentHeader title="Datasets" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.integraDatasetsContainer}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={classes.actionRow}
        >
          <div className={classes.searchContainer}>
            <StandardInput
              value={searchValue}
              setValue={setSearchValue}
              placeholder="Search..."
              endIcon={
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={classes.searchIconAdornment}
                />
              }
            />
          </div>
          <ToggleButtonGroup
            value={rootSignals.viewMap.value ? "map" : "list"}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              value="list"
              aria-label="list-view"
              className={classes.toggleGroupButton}
            >
              <FontAwesomeIcon
                icon={faTableList}
                className={classes.toggleGroupIcon}
              />
            </ToggleButton>
            <ToggleButton
              value="map"
              aria-label="map-view"
              className={classes.toggleGroupButton}
            >
              <FontAwesomeIcon
                icon={faMapLocationDot}
                className={classes.toggleGroupIcon}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid container direction="row" className={classes.viewContainer}>
          <DataTable />
          {rootSignals.viewMap.value && <IntegraMap />}
        </Grid>
      </Grid>
    </>
  );
};

export const IntegraDatasets = IntegraDatasetsComponent;
