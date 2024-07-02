import * as React from "react";
import { integraExploreStyles } from "./IntegraExploreStyles";
import { IntegraContentHeader } from "../ContentHeader/IntegraContentHeader";
import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { StandardInput } from "../../../components/_common/StandardInput/StandardInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMapLocationDot,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSignals } from "../../../common/AppContext";
import algoliasearch from "algoliasearch";
import { ObjectGrid } from "../../../components/ObjectGrid/ObjectGrid";

interface IIntegraExplore {}

const IntegraExploreComponent: React.FunctionComponent<
  IIntegraExplore
> = () => {
  const { classes } = integraExploreStyles();
  const { rootSignals } = useAppSignals();
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);

  const client = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_KEY
  );
  const exploreIndex = client.initIndex("Objects");

  React.useEffect(() => {
    fetchObjectHits(searchValue);
  }, [searchValue]);

  const fetchObjectHits = async (value: string) => {
    exploreIndex.search(value).then(({ hits }) => {
      setSearchResults(hits);
    });
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newViewType: string
  ) => {
    if (newViewType === null) return;
    rootSignals.viewMapExplore.value = newViewType === "map";
  };

  return (
    <>
      <IntegraContentHeader title="Explore" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.integraExploreContainer}
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
            value={rootSignals.viewMapExplore.value ? "map" : "grid"}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              value="grid"
              aria-label="grid-view"
              className={classes.toggleGroupButton}
            >
              <FontAwesomeIcon
                icon={faTableCellsLarge}
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
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.searchContentContainer}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={classes.sortContainer}
          >
            <div>Sort Container</div>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={classes.resultsContainer}
          >
            <ObjectGrid items={searchResults} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const IntegraExplore = IntegraExploreComponent;
