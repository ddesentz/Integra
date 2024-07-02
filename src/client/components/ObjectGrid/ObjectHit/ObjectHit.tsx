import * as React from "react";
import { objectHitStyles } from "./ObjectHitStyles";
import { Divider, Grid, Typography } from "@mui/material";
import {
  flatten,
  getObjectDataFromHit,
  sortObject,
} from "../../../common/Helper/HelperFunctions";
import Parser from "html-react-parser";
import { StandardButton } from "../../_common/StandardButton/StandardButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Editor } from "@monaco-editor/react";
import { useNavigate } from "react-router";
import { useAppSignals } from "../../../common/AppContext";

interface IHit {
  label: string;
  value: string;
}

interface IObjectHit {
  hit: any;
}

const ObjectHitComponent: React.FunctionComponent<IObjectHit> = ({ hit }) => {
  const { classes } = objectHitStyles();
  const { rootSignals } = useAppSignals();
  const navigate = useNavigate();
  const [viewDetails, setViewDetails] = React.useState<boolean>(false);
  const callsign = hit.identity?.callsign;

  const navigateToRecord = () => {
    navigate("/datasets");
    rootSignals.datasetPath.value = [hit["_datasetId"], callsign];
  };

  const handleDetailObject = () => {
    setViewDetails((prev) => {
      if (!viewDetails) {
        rootSignals.exploreFocusObject.value = { id: callsign, data: hit };
      }
      return !viewDetails;
    });
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

  const renderHighlightedHit = (hit: any, index: number) => {
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

  const flatHits = React.useMemo(
    () => flatten(hit._highlightResult),
    [hit._highlightResult]
  );
  const displayHits = React.useMemo(() => parseHits(flatHits), [flatHits]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      className={classes.objectHitContainer}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className={
          rootSignals.exploreFocusObject.value &&
          rootSignals.exploreFocusObject.value.id === callsign
            ? classes.focusHeaderContainer
            : classes.objectHeaderContainer
        }
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
        {viewDetails ? (
          <Editor
            theme="integraObject"
            height={"100%"}
            language="json"
            value={JSON.stringify(
              sortObject(getObjectDataFromHit(hit)),
              null,
              2
            )}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        ) : (
          <>
            {displayHits.length > 0 ? (
              <>
                {displayHits.map((hit, index) => {
                  return renderHighlightedHit(hit, index);
                })}
              </>
            ) : (
              <>{renderDefaultHit(hit._highlightResult)}</>
            )}
          </>
        )}
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
        className={classes.actionContainer}
      >
        <Divider className={classes.objectItemActionDivider} />
        <Typography
          onClick={navigateToRecord}
          className={classes.linkToRecordText}
        >
          {hit["_datasetId"]}/{callsign}
        </Typography>
        <div className={classes.actionButtonWrapper}>
          <StandardButton
            text={viewDetails ? "Hits" : "Details"}
            type="action"
            onClick={handleDetailObject}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export const ObjectHit = ObjectHitComponent;
