import * as React from "react";
import { dataTablePanelStyles } from "./DataTablePanelStyles";
import { Grid, Typography } from "@mui/material";
import {
  faDatabase,
  faFile,
  faFolder,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PanelItem } from "./Item/PanelItem";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../../..";
import { useAppSignals } from "../../../common/AppContext";

interface IDataTablePanel {
  index: number;
  path: string;
  type: string;
}

const DataTablePanelComponent: React.FunctionComponent<IDataTablePanel> = ({
  index,
  path,
  type,
}) => {
  const { classes } = dataTablePanelStyles();
  const functions = getFunctions(app);
  const { rootSignals } = useAppSignals();
  const collectionPath = rootSignals.collectionPath.value;
  const splitPath = path.split("/");
  const displayPath = splitPath[splitPath.length - 1];
  const [items, setItems] = React.useState<string[]>([
    "Item 1",
    "Item 2",
    "Item 3",
    "Object 1",
  ]);
  const [rootCollections, setRootCollections] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (type === "root") {
      getRootCollections();
    } else if (type === "collection") {
      getCollectionRecords();
    } else {
      getRecordData();
    }
  }, [type]);

  const getRootCollections = () => {
    const callableReturnMessage = httpsCallable(functions, "getRootStore");
    callableReturnMessage().then((result: any) => {
      setRootCollections(result.data);
    });
  };

  const getCollectionRecords = () => {};

  const getRecordData = () => {};

  const renderTypeIcon = () => {
    let icon = faDatabase;
    if (type === "collection") {
      icon = faFolder;
    } else if (type === "record") {
      icon = faFile;
    }

    return <FontAwesomeIcon icon={icon} className={classes.typeIcon} />;
  };

  const getDisplayStyle = (activeIndex: number) => {
    if (collectionPath.length === 0) return "block";
    if (activeIndex + 2 < collectionPath.length) {
      return "none";
    } else return "flex";
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      className={classes.dataTablePanelContainer}
      //   style={{ display: getDisplayStyle(index) }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className={classes.panelHeader}
      >
        <Grid item className={classes.detailWrapper}>
          {renderTypeIcon()}
          <Typography className={classes.labelText}>{displayPath}</Typography>
        </Grid>
        <FontAwesomeIcon icon={faPlus} className={classes.typeIcon} />
      </Grid>
      {type === "root"
        ? rootCollections.map((item, idx) => {
            return <PanelItem key={idx} index={index} label={item} />;
          })
        : items.map((item, idx) => {
            return <PanelItem key={idx} index={index} label={item} />;
          })}
    </Grid>
  );
};

export const DataTablePanel = DataTablePanelComponent;
