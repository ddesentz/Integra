import * as React from "react";
import { timeControllerStyles } from "./TimeControllerStyles";
import { Grid, IconButton, Slider, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardFast,
  faBackwardStep,
  faForwardFast,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSignals } from "../../../common/AppContext";
import { isArray } from "util";

interface ITimeControllerMark {
  value: number;
  label: string;
}

interface ITimeController {}
const TimeControllerComponent: React.FunctionComponent<
  ITimeController
> = () => {
  const { classes } = timeControllerStyles();
  const { rootSignals } = useAppSignals();
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [startRange, setStartRange] = React.useState<number | null>(null);
  const [endRange, setEndRange] = React.useState<number | null>(null);
  const [marks, setMarks] = React.useState<ITimeControllerMark[]>([]);
  const [value, setValue] = React.useState<number>(0);
  const intervalRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (rootSignals.datasetPath.value.length === 3) {
      setIsPlaying(false);
      intervalRef.current && clearInterval(intervalRef.current);
    }
  }, [rootSignals.datasetPath.value]);

  React.useEffect(() => {
    if (rootSignals.datasetPath.value.length === 4 && marks.length > 0) {
      const index = marks.findIndex(
        (mark) => mark.label === rootSignals.datasetPath.value[3]
      );
      if (index !== -1) {
        setValue(index);
      }
    }
  }, [rootSignals.activeObject.value, marks]);

  React.useEffect(() => {
    if (rootSignals.datasetsMapData.value.isHistory) {
      const points = rootSignals.datasetsMapData.value.features;
      const sortedTimeStamps = points
        .map((point) => point.properties.timestamp)
        .sort();
      setMarks(
        sortedTimeStamps.map((timeStamp, index) => {
          return { value: index, label: timeStamp };
        })
      );
      if (startRange === null) {
        setStartRange(sortedTimeStamps[0]);
      }
      if (endRange === null) {
        setEndRange(sortedTimeStamps[sortedTimeStamps.length - 1]);
      }
    }
  }, [rootSignals.datasetsMapData.value]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      rootSignals.datasetPath.value = [
        ...rootSignals.datasetPath.value.slice(0, 3),
        marks[value].label,
      ];
      intervalRef.current = setInterval(() => {
        setValue((prevValue) => {
          if (prevValue < marks.length - 1) {
            rootSignals.datasetPath.value = [
              ...rootSignals.datasetPath.value.slice(0, 3),
              marks[prevValue + 1].label,
            ];
            return prevValue + 1;
          } else {
            setIsPlaying(false);
            clearInterval(intervalRef.current);
            return prevValue;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    }
  };

  const handleChange = (event: Event, newValue: number) => {
    if (value === newValue) return;
    rootSignals.datasetPath.value = [
      ...rootSignals.datasetPath.value.slice(0, 3),
      marks[newValue].label,
    ];
  };

  const handleJump = (index: number) => {
    if (index >= 0 && index < marks.length && value !== index) {
      setValue(index);
      rootSignals.datasetPath.value = [
        ...rootSignals.datasetPath.value.slice(0, 3),
        marks[index].label,
      ];
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      className={classes.timeControllerContainer}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item className={classes.formatedTimeContainer}>
          <Typography className={classes.rangeTimestampText}>
            {marks[0] ? marks[0].label.split("T")[0] : ""}
          </Typography>
          <Typography className={classes.rangeTimestampText}>
            {marks[0] ? marks[0].label.split("T")[1] : ""}
          </Typography>
        </Grid>
        {rootSignals.datasetPath.value.length === 4 && (
          <Grid item className={classes.formatedTimeContainer}>
            <Typography className={classes.activeTimestampText}>
              {rootSignals.datasetPath.value[3].split("T")[0]}
            </Typography>
            <Typography className={classes.activeTimestampText}>
              {rootSignals.datasetPath.value[3].split("T")[1]}
            </Typography>
          </Grid>
        )}
        <Grid item className={classes.formatedTimeContainer}>
          <Typography className={classes.rangeTimestampText}>
            {marks[marks.length - 1]
              ? marks[marks.length - 1].label.split("T")[0]
              : ""}
          </Typography>
          <Typography className={classes.rangeTimestampText}>
            {marks[marks.length - 1]
              ? marks[marks.length - 1].label.split("T")[1]
              : ""}
          </Typography>
        </Grid>
      </Grid>

      <Slider
        value={value}
        onChange={handleChange}
        step={null}
        marks={marks}
        valueLabelDisplay="off"
        min={marks.length > 0 ? marks[0].value : 0}
        max={marks.length > 0 ? marks[marks.length - 1].value : 0}
        className={classes.timeConrollerSlider}
      />
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          disabled={isPlaying}
          onClick={() => handleJump(0)}
          disableRipple
          className={classes.timeActionButton}
        >
          <FontAwesomeIcon
            icon={faBackwardFast}
            className={classes.secondaryTimeActionIcon}
          />
        </IconButton>
        <IconButton
          disabled={isPlaying}
          onClick={() => handleJump(value - 1)}
          disableRipple
          className={classes.timeActionButton}
        >
          <FontAwesomeIcon
            icon={faBackwardStep}
            className={classes.secondaryTimeActionIcon}
          />
        </IconButton>
        <IconButton
          onClick={handlePlayPause}
          disableRipple
          className={classes.timeActionButton}
        >
          <FontAwesomeIcon
            icon={isPlaying ? faPause : faPlay}
            className={classes.mainTimeActionIcon}
          />
        </IconButton>
        <IconButton
          disabled={isPlaying}
          onClick={() => handleJump(value + 1)}
          disableRipple
          className={classes.timeActionButton}
        >
          <FontAwesomeIcon
            icon={faForwardStep}
            className={classes.secondaryTimeActionIcon}
          />
        </IconButton>
        <IconButton
          disabled={isPlaying}
          onClick={() => handleJump(marks.length - 1)}
          disableRipple
          className={classes.timeActionButton}
        >
          <FontAwesomeIcon
            icon={faForwardFast}
            className={classes.secondaryTimeActionIcon}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const TimeController = TimeControllerComponent;
