import * as React from "react";
import { dataTablePanelStyles } from "./DataTablePanelStyles";
import {
  CircularProgress,
  Grid,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
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
  convertObjectsToFeatureCollection,
  sortObject,
  updateObjectHistory,
  uploadObjects,
} from "../../../common/Helper/HelperFunctions";
import {
  LIVE_POV_Object_Events,
  LIVE_POV_Object_Single_Track,
} from "../../../common/Helper/HelperData";
import { AutoSizer, List } from "react-virtualized";
import { StandardAutocomplete } from "../../_common/StandardAutocomplete/StandardAutocomplete";
import { RecordUploadModal } from "../../RecordUploadModal/RecordUploadModal";

interface IDataTablePanel {
  dataPathIndex: number;
  path: string;
  type: string;
}

const DataTablePanelComponent: React.FunctionComponent<IDataTablePanel> = ({
  dataPathIndex,
  path,
  type,
}) => {
  const { classes } = dataTablePanelStyles();
  const functions = getFunctions(app);
  const { rootSignals } = useAppSignals();
  const splitPath = path.split("/");
  const displayPath = splitPath[splitPath.length - 1];
  const [openUploadModal, setOpenUploadModal] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<string[]>([]);
  const [recordJSON, setRecordJSON] = React.useState<any>(null);
  const [recordCollections, setRecordCollections] = React.useState<string[]>(
    []
  );
  const [loadingList, setLoadingList] = React.useState<boolean>(false);
  const [loadingCollection, setLoadingCollection] =
    React.useState<boolean>(false);
  const listRef = React.createRef<List>();
  const scrollContainerRef = React.createRef<any>();

  React.useEffect(() => {
    let unsub: any;
    const indexPath = [
      ...rootSignals.datasetPath.value.slice(0, dataPathIndex),
    ];
    if (type === "root") {
      setLoadingList(true);
      const callableReturnMessage = httpsCallable(functions, "getRootStore");
      callableReturnMessage().then((result: any) => {
        setItems(result.data);
        setLoadingList(false);
      });
    } else if (type === "collection") {
      if (dataPathIndex <= indexPath.length) {
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
          if (rootSignals.datasetPath.value.length <= 2) {
            rootSignals.mapData.value = convertObjectsToFeatureCollection(
              snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              }),
              false
            );
          }
          if (rootSignals.datasetPath.value.length > 2 && dataPathIndex > 2) {
            rootSignals.mapData.value = convertObjectsToFeatureCollection(
              snapshot.docs.map((doc) => {
                return {
                  id: doc.data().identity.callsign,
                  timestamp: doc.id,
                  ...doc.data(),
                };
              }),
              true
            );
          }
        });
      }
    } else {
      if (dataPathIndex === rootSignals.datasetPath.value.length) {
        const parentPath = indexPath.slice(0, indexPath.length - 1).join("/");
        const docId = indexPath[indexPath.length - 1];
        if (dataPathIndex === 2) {
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
          if (rootSignals.datasetPath.value.length % 2 === 0) {
            rootSignals.activeObject.value = {
              id: doc.id,
              ...doc.data(),
            };
          }
          setLoadingList(false);
        });
      }
    }
    return () => {
      if (unsub) unsub();
    };
  }, [type, rootSignals.datasetPath.value]);

  React.useEffect(() => {
    if (rootSignals.activeObject.value) {
      if (dataPathIndex === 1 || dataPathIndex === 3) {
        const activeIndex = items.findIndex(
          (item) => item === rootSignals.activeObject.value.id
        );
        if (activeIndex !== -1) {
          listRef.current?.scrollToPosition(activeIndex * 40);
        }
      }
    }
  }, [rootSignals.activeObject.value]);

  const handleOpenUploadModal = () => {
    setOpenUploadModal(true);
    // const sortedData = LIVE_POV_Object_Single_Track.sort((a: any, b: any) => {
    //   return a.crucibleHeader.updatedDate < b.crucibleHeader.updatedDate
    //     ? -1
    //     : 1;
    // });
    // uploadObjects(sortedData, "Live_POV_Objects2");
  };

  const handleCloseUploadModal = () => {
    setOpenUploadModal(false);
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
                      <PanelItem
                        key={idx}
                        index={dataPathIndex}
                        label={collection}
                      />
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
                editable={rootSignals.datasetPath.value.length === 2}
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
        <div
          ref={scrollContainerRef}
          className={classes.contentScrollContainer}
        >
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={listRef}
                width={scrollContainerRef.current?.clientWidth || width}
                height={height}
                rowCount={items.length}
                rowHeight={40}
                rowRenderer={({ key, index, style }) => {
                  return (
                    <div key={key} style={style}>
                      <PanelItem index={dataPathIndex} label={items[index]} />
                    </div>
                  );
                }}
              />
            )}
          </AutoSizer>
        </div>
      );
      return;
    }
  };

  if (dataPathIndex > rootSignals.datasetPath.value.length) return null;

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      className={
        rootSignals.viewMap.value
          ? classes.mapDataTablePanelContainer
          : classes.dataTablePanelContainer
      }
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
        {dataPathIndex < 2 && (
          <FontAwesomeIcon
            icon={faPlus}
            className={classes.actionIcon}
            onClick={handleOpenUploadModal}
          />
        )}
      </Grid>
      {renderContent()}
      <RecordUploadModal
        open={openUploadModal}
        setOpen={setOpenUploadModal}
        datasetPath={dataPathIndex === 0 ? "" : path}
      />
    </Grid>
  );
};

export const DataTablePanel = DataTablePanelComponent;
