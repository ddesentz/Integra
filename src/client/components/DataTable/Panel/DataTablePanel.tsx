import * as React from "react";
import { dataTablePanelStyles } from "./DataTablePanelStyles";
import { CircularProgress, Grid, Skeleton, Typography } from "@mui/material";
import {
  faDatabase,
  faFile,
  faFolder,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PanelItem } from "./Item/PanelItem";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app, db } from "../../../..";
import { useAppSignals } from "../../../common/AppContext";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import {
  sortObject,
  updateObjectHistory,
  uploadObjects,
} from "../../../common/Helper/HelperFunctions";
import { LIVE_POV_Object_Events } from "../../../common/Helper/HelperData";

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
  const splitPath = path.split("/");
  const displayPath = splitPath[splitPath.length - 1];
  const [items, setItems] = React.useState<string[]>([]);
  const [recordJSON, setRecordJSON] = React.useState<any>(null);
  const [recordCollections, setRecordCollections] = React.useState<string[]>(
    []
  );
  const [loadingList, setLoadingList] = React.useState<boolean>(false);
  const [loadingCollection, setLoadingCollection] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    let unsub: any;
    const indexPath = [...rootSignals.datasetPath.value.slice(0, index)];
    if (type === "root") {
      setLoadingList(true);
      const callableReturnMessage = httpsCallable(functions, "getRootStore");
      callableReturnMessage().then((result: any) => {
        setItems(result.data);
        setLoadingList(false);
      });
    } else if (type === "collection") {
      if (index <= indexPath.length) {
        setLoadingList(true);
        const allRecordsQuery = query(collection(db, indexPath.join("/")));
        unsub = onSnapshot(allRecordsQuery, (snapshot) => {
          setItems(
            snapshot.docs
              .map((doc) => doc.id)
              .sort((a: string, b: string) =>
                a.toLowerCase() > b.toLowerCase() ? -1 : 1
              )
          );
          setLoadingList(false);
        });
      }
    } else {
      if (index <= indexPath.length) {
        const parentPath = indexPath.slice(0, indexPath.length - 1).join("/");
        const docId = indexPath[indexPath.length - 1];
        if (index === 2) {
          setLoadingCollection(true);
          const callableReturnMessage = httpsCallable(
            functions,
            "getDocumentCollections"
          );
          callableReturnMessage({ parentPath: parentPath, docId: docId }).then(
            (result: any) => {
              setRecordCollections(result.data);
              setLoadingCollection(false);
            }
          );
        }
        setLoadingList(true);
        unsub = onSnapshot(doc(db, parentPath, docId), (doc) => {
          setRecordJSON(doc.data());
          setLoadingList(false);
        });
      }
    }
    return () => {
      if (unsub) unsub();
    };
  }, [type, rootSignals.datasetPath.value]);

  const handleUploadData = () => {
    uploadObjects(LIVE_POV_Object_Events, "Live_POV_Objects");
  };

  const handleDocChange = (newDoc: any) => {
    updateObjectHistory(
      newDoc.src,
      rootSignals.datasetPath.value[0],
      rootSignals.datasetPath.value[1]
    );
  };

  const renderTypeIcon = () => {
    let icon = faDatabase;
    if (type === "collection") {
      icon = faFolder;
    } else if (type === "record") {
      icon = faFile;
    }

    return <FontAwesomeIcon icon={icon} className={classes.typeIcon} />;
  };

  const renderContent = () => {
    if (type === "record") {
      return (
        <>
          {loadingCollection && recordCollections.length === 0 ? (
            <div className={classes.loadingrecordContentContainer}>
              <div className={classes.loadingContainer}>
                <CircularProgress size={40} />
              </div>
            </div>
          ) : (
            <>
              {recordCollections.length > 0 && (
                <div className={classes.recordContentContainer}>
                  {recordCollections.map((collection, idx) => {
                    return (
                      <PanelItem key={idx} index={index} label={collection} />
                    );
                  })}
                </div>
              )}
            </>
          )}

          {loadingList && recordJSON === null ? (
            <div className={classes.loadingContainer}>
              <CircularProgress size={100} />
            </div>
          ) : (
            <div className={classes.contentScrollContainer}>
              <JsonView
                src={sortObject(recordJSON, true)}
                editable={true}
                onChange={handleDocChange}
                className={classes.jsonViewerContainer}
              />
            </div>
          )}
        </>
      );
    } else {
      return loadingList && items.length === 0 ? (
        <div className={classes.loadingContainer}>
          <CircularProgress size={100} />
        </div>
      ) : (
        <div className={classes.contentScrollContainer}>
          {items.map((item, idx) => {
            return <PanelItem key={idx} index={index} label={item} />;
          })}
        </div>
      );
      return;
    }
  };

  if (index > rootSignals.datasetPath.value.length) return null;

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      className={classes.dataTablePanelContainer}
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
          <Typography className={classes.labelText}>
            {displayPath}
            {type === "collection" ? ` (${items.length})` : ""}
          </Typography>
        </Grid>
        <FontAwesomeIcon
          icon={faPlus}
          className={classes.actionIcon}
          onClick={handleUploadData}
        />
      </Grid>
      {renderContent()}
    </Grid>
  );
};

export const DataTablePanel = DataTablePanelComponent;
