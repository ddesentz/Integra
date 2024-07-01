import * as React from "react";
import { recordUploadModalStyles } from "./RecordUploadModalStyles";
import { Divider, Grid, Modal, Typography } from "@mui/material";
import { StandardAutocomplete } from "../_common/StandardAutocomplete/StandardAutocomplete";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../..";
import Editor from "@monaco-editor/react";
import { StandardButton } from "../_common/StandardButton/StandardButton";
import { StandardOptionButton } from "../_common/StandardOptionButton/StandardOptionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faUpload } from "@fortawesome/free-solid-svg-icons";
import { uploadObjects } from "../../common/Helper/HelperFunctions";
import { useAppSignals } from "../../common/AppContext";

interface IRecordUploadModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  datasetPath?: string;
}

const RecordUploadModalComponent: React.FunctionComponent<
  IRecordUploadModal
> = ({ open, setOpen, datasetPath = "" }) => {
  const { classes } = recordUploadModalStyles();
  const { rootSignals } = useAppSignals();
  const functions = getFunctions(app);
  const [dataset, setDataset] = React.useState<string>(datasetPath);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [datasetOptions, setDatasetOptions] = React.useState<string[]>([]);
  const [editorLanguage, setEditorLanguage] = React.useState<string>("json");
  const fileSelectorRef = React.useRef<HTMLInputElement | null>(null);
  const [editorValue, setEditorValue] = React.useState<string>(
    "[\n\t{}\n]".replace("\n", "\r\n")
  );

  React.useEffect(() => {
    const callableReturnMessage = httpsCallable(functions, "getRootStore");
    callableReturnMessage().then((result: any) => {
      setDatasetOptions(result.data);
    });
  }, []);

  const FileSelector = () =>
    React.createElement("input", {
      type: "file",
      accept: "application/json, .yml, .yaml",
      ref: fileSelectorRef,
      style: { display: "none" },
      onChange: function (e) {
        if (e.target.files && e.target.files?.length > 0) {
          var reader = new FileReader();
          reader.onload = function (event) {
            // @ts-ignore
            const jsonObj = JSON.parse(event.target.result);
            if (jsonObj !== null && jsonObj !== undefined) {
              setEditorValue(JSON.stringify(jsonObj, null, 2));
            }
          };

          reader.readAsText(e.target.files[0]);
        }
      },
    });

  const handleBrowse = () => {
    if (fileSelectorRef.current !== null) {
      fileSelectorRef.current.click();
    }
  };

  const handleCloseUploadModal = () => {
    setOpen(false);
  };

  const datasetItemRenderer = (item: string, index: number) => {
    return (
      <Typography key={index} className={classes.itemRenderer}>
        {item}
      </Typography>
    );
  };

  const validateUpload = () => {
    let jsonObj;
    if (editorValue === "[\n\t{}\n]".replace("\n", "\r\n")) return true;
    try {
      jsonObj = JSON.parse(editorValue);
    } catch (error) {
      return true;
    }
    if (Array.isArray(jsonObj) && jsonObj.length === 0) {
      return true;
    }
    if (dataset === "" || editorValue === "") {
      return true;
    }
    return false;
  };

  const uploadData = () => {
    const uploadData = JSON.parse(editorValue);
    if (Array.isArray(uploadData)) {
      uploadObjects(uploadData, dataset);
    } else {
      uploadObjects([uploadData], dataset);
    }
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseUploadModal}
      className={classes.recordUploadModalContainer}
    >
      <div className={classes.uploadModal}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          className={classes.uploadModalHeader}
        >
          <Typography className={classes.uploadModalHeaderText}>
            Data Upload
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          className={classes.uploadModalContentContainer}
        >
          <Typography className={classes.sectionHeaderText}>Dataset</Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <div className={classes.autoCompleteWrapper}>
              <StandardAutocomplete
                value={dataset}
                setValue={setDataset}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Dataset"
                options={datasetOptions}
                itemRenderer={datasetItemRenderer}
                freeSolo={true}
                disabled={rootSignals.datasetPath.value.length > 1}
              />
            </div>
            {dataset !== "" &&
              !datasetOptions.some((option) => option === dataset) && (
                <Typography className={classes.newDatasetInfoText}>
                  Creating new dataset
                </Typography>
              )}
          </Grid>
          <Divider className={classes.divider} />
          <Typography className={classes.sectionHeaderText}>Data</Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className={classes.actionButtonsContainer}
          >
            <div className={classes.buttonWrapper}>
              <StandardButton
                text="Import"
                onClick={handleBrowse}
                endIcon={
                  <FontAwesomeIcon
                    icon={faFileImport}
                    className={classes.actionIcon}
                  />
                }
              />
            </div>
            <div className={classes.buttonWrapper}>
              <StandardOptionButton
                value={editorLanguage}
                setValue={setEditorLanguage}
                options={["json", "yaml"]}
              />
            </div>
          </Grid>
          <div className={classes.editorWrapper}>
            <Editor
              theme="uploadEditor"
              height={"40vh"}
              language={editorLanguage}
              value={editorValue}
              onChange={(value) => setEditorValue(value)}
              options={{
                readOnly: false,
                minimap: { enabled: false },
              }}
              className={classes.editor}
            />
          </div>
          <Divider className={classes.divider} />
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent=" flex-end"
            className={classes.submitContainer}
          >
            <div className={classes.buttonWrapper}>
              <StandardButton text="Cancel" onClick={() => setOpen(false)} />
            </div>
            <div className={classes.buttonWrapper}>
              <StandardButton
                text="Upload"
                onClick={uploadData}
                disabled={validateUpload()}
                endIcon={
                  <FontAwesomeIcon
                    icon={faUpload}
                    className={classes.actionIcon}
                  />
                }
                type="action"
              />
            </div>
          </Grid>
        </Grid>
        <FileSelector />
      </div>
    </Modal>
  );
};

export const RecordUploadModal = RecordUploadModalComponent;
