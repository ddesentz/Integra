import * as React from "react";
import { objectGridStyles } from "./ObjectGridStyles";
import { AutoSizer, Grid as VirtualizedGrid } from "react-virtualized";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Grid, Typography } from "@mui/material";
import { ObjectHit } from "./ObjectHit/ObjectHit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppSignals } from "../../common/AppContext";

const ITEM_MIN_WIDTH = 400;
const ITEM_HEIGHT = 400;

interface IObjectGrid {
  items: any[];
}
const ObjectGridComponent: React.FunctionComponent<IObjectGrid> = ({
  items,
}) => {
  const { classes } = objectGridStyles();
  const { rootSignals } = useAppSignals();
  const gridRef = React.useRef<any>(null);
  const containerRef = React.useRef<any>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(
    containerRef?.current?.clientWidth
  );
  const windowSize = useWindowSize();
  const virtualGrid = document.getElementById("virtualGrid");
  if (virtualGrid) {
    virtualGrid.style.overflowX = "hidden";
  }
  const [scrollToRow, setScrollToRow] = React.useState<number>(0);
  const [scrollToColumn, setScrollToColumn] = React.useState<number>(0);

  React.useEffect(() => {
    setContainerWidth(containerRef?.current?.clientWidth);
    gridRef.current?.recomputeGridSize();
    scrollToFocusObject();
  }, [
    windowSize,
    rootSignals.viewMapExplore.value,
    rootSignals.exploreScrollObject.value,
  ]);

  const scrollToFocusObject = () => {
    if (rootSignals.exploreScrollObject.value) {
      const itemIndex = items.findIndex(
        (item) =>
          item.identity.callsign === rootSignals.exploreScrollObject.value.id
      );
      scrollGridIndex(itemIndex);
      rootSignals.exploreScrollObject.value = null;
    }
  };

  const calculateColumnCount = (width: number) => {
    return Math.floor(width / ITEM_MIN_WIDTH);
  };

  const calculateItemWidth = (width: number, columnCount: number) => {
    return width / columnCount;
  };

  const getItemIndex = (rowIndex: number, columnIndex: number) => {
    return rowIndex * columnCount + (columnIndex + 1);
  };

  const scrollGridIndex = (itemIndex: number) => {
    setScrollToRow(Math.floor(itemIndex / columnCount));
    setScrollToColumn(itemIndex % columnCount);
  };

  const columnCount = React.useMemo(
    () => calculateColumnCount(containerWidth),
    [containerWidth, gridRef.current]
  );
  const rowCount = React.useMemo(
    () => Math.ceil(items.length / columnCount),
    [items.length, columnCount, gridRef.current]
  );
  const itemWidth = React.useMemo(
    () => calculateItemWidth(containerWidth, columnCount),
    [containerWidth, columnCount, gridRef.current]
  );

  const renderObjectItem = (itemIndex: number) => {
    return (
      <div className={classes.objectItemWrapper}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={
            rootSignals.exploreFocusObject.value &&
            items[itemIndex] &&
            items[itemIndex].identity?.callsign ===
              rootSignals.exploreFocusObject.value.id
              ? classes.focusItemContent
              : classes.objectItemContent
          }
        >
          <ObjectHit hit={items[itemIndex]} />
        </Grid>
      </div>
    );
  };

  return (
    <div ref={containerRef} className={classes.objectGridContainer}>
      {containerWidth && columnCount && items.length > 0 ? (
        <AutoSizer>
          {({ height }) => {
            return (
              <VirtualizedGrid
                id="virtualGrid"
                ref={gridRef}
                width={containerWidth}
                height={height}
                columnCount={columnCount}
                columnWidth={itemWidth}
                rowCount={rowCount}
                rowHeight={ITEM_HEIGHT}
                overscanRowCount={3}
                scrollToAlignment="start"
                scrollToColumn={scrollToColumn}
                scrollToRow={scrollToRow}
                cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                  const itemIndex = getItemIndex(rowIndex, columnIndex);
                  if (itemIndex <= items.length) {
                    return (
                      <div key={key} style={style}>
                        {renderObjectItem(itemIndex - 1)}
                      </div>
                    );
                  }
                  return null;
                }}
                style={{ overflowX: "hidden" }}
              />
            );
          }}
        </AutoSizer>
      ) : (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.emptyContainer}
        >
          <FontAwesomeIcon
            icon={faFileCircleXmark}
            className={classes.emptyIcon}
          />
          <Typography className={classes.emptyText}>
            No Objects Found
          </Typography>
        </Grid>
      )}
    </div>
  );
};

export const ObjectGrid = ObjectGridComponent;
