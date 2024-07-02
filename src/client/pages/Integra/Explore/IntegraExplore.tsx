import * as React from "react";
import { integraExploreStyles } from "./IntegraExploreStyles";
import { IntegraContentHeader } from "../ContentHeader/IntegraContentHeader";
import {
  Divider,
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
import Flag from "react-world-flags";
import { StandardButton } from "../../../components/_common/StandardButton/StandardButton";
import { flatten } from "../../../common/Helper/HelperFunctions";
import Parser from "html-react-parser";
import { integraTheme } from "../../../common/Theme";

interface IHit {
  label: string;
  value: string;
}

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

  const parseHits = (flatHits: object) => {
    let hits: IHit[] = [];
    for (const key in flatHits) {
      const splitKey = key.split(".");
      if (
        splitKey[splitKey.length - 1] === "matchedWords" &&
        flatHits[splitKey.join(".")].length > 0
      ) {
        const label = splitKey.slice(0, -1).join(".");
        if (label[0] !== "_") {
          hits.push({ label: label, value: flatHits[label + ".value"] });
        }
      }
    }
    return hits;
  };

  const renderDefaultHit = (hit: any) => {
    const displayHits: IHit[] = [
      {
        label: "allegiance",
        value: hit.identity?.standard?.allegiance.value || "Unknown",
      },
      {
        label: "environment",
        value: hit.identity?.environment?.environment.value || "Unknown",
      },
    ];

    return (
      <>
        <Typography className={classes.defaultDescriptiveLabelText}>
          {hit.objectId?.descriptiveLabel?.value}
        </Typography>
        {displayHits.map((hit, index) => {
          const splitLabel = hit.label.split(".");
          return (
            <Grid
              key={index}
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              className={classes.hitCell}
            >
              <Typography className={classes.hitValueText}>
                {Parser(hit.value)}
              </Typography>
              <Typography className={classes.hitLabelText}>
                {splitLabel[splitLabel.length - 1]}
              </Typography>
            </Grid>
          );
        })}
      </>
    );
  };

  const hitRenderer = (hit: any) => {
    if (!hit) return null;
    const highlights = hit._highlightResult;
    const flatHits = flatten(highlights);
    const displayHits = parseHits(flatHits);
    const callsign = hit.identity?.callsign;
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        className={classes.objectWrapper}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={classes.objectHeaderContainer}
        >
          <Typography className={classes.callsignText}>{callsign}</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          className={classes.hitCellsContainer}
        >
          {displayHits.length > 0 ? (
            <>
              {displayHits.map((hit, index) => {
                const splitLabel = hit.label.split(".");
                return (
                  <Grid
                    key={index}
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.hitCell}
                  >
                    <Typography className={classes.hitValueText}>
                      {Parser(hit.value)}
                    </Typography>
                    <Typography className={classes.hitLabelText}>
                      {splitLabel[splitLabel.length - 1]}
                    </Typography>
                  </Grid>
                );
              })}
            </>
          ) : (
            <>{renderDefaultHit(highlights)}</>
          )}
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={classes.actionContainer}
        >
          <Divider className={classes.objectItemActionDivider} />
          <div className={classes.actionButtonWrapper}>
            <StandardButton text="Details" type="action" onClick={() => {}} />
          </div>
        </Grid>
      </Grid>
    );
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
            <ObjectGrid items={searchResults} itemRenderer={hitRenderer} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const IntegraExplore = IntegraExploreComponent;
