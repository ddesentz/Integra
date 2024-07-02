import * as React from "react";
import { objectGridStyles } from "./ObjectGridStyles";
import { AutoSizer, Grid as VirtualizedGrid } from "react-virtualized";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Grid } from "@mui/material";

const ITEM_MIN_WIDTH = 400;
const ITEM_HEIGHT = 400;

interface IObjectGrid {
  items: any[];
  itemRenderer: (item: any) => JSX.Element;
}
const ObjectGridComponent: React.FunctionComponent<IObjectGrid> = ({
  items,
  itemRenderer,
}) => {
  const { classes } = objectGridStyles();
  const gridRef = React.useRef<any>(null);
  const containerRef = React.useRef<any>(null);
  const containerWidth = containerRef?.current?.clientWidth;
  const windowSize = useWindowSize();
  const virtualGrid = document.getElementById("virtualGrid");
  if (virtualGrid) {
    virtualGrid.style.overflowX = "hidden";
  }

  React.useEffect(() => {
    gridRef.current?.recomputeGridSize();
  }, [windowSize]);

  const calculateColumnCount = (width: number) => {
    return Math.floor(width / ITEM_MIN_WIDTH);
  };

  const calculateItemWidth = (width: number, columnCount: number) => {
    return width / columnCount;
  };

  const getItemIndex = (rowIndex: number, columnIndex: number) => {
    return rowIndex * columnCount + (columnIndex + 1);
  };

  const columnCount = React.useMemo(
    () => calculateColumnCount(containerWidth),
    [containerWidth]
  );
  const rowCount = React.useMemo(
    () => Math.ceil(items.length / columnCount),
    [items.length, columnCount]
  );
  const itemWidth = React.useMemo(
    () => calculateItemWidth(containerWidth, columnCount),
    [containerWidth, columnCount]
  );

  const renderObjectItem = (itemIndex: number) => {
    return (
      <div className={classes.objectItemWrapper}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.objectItemContent}
        >
          {itemRenderer(items[itemIndex])}
        </Grid>
      </div>
    );
  };

  return (
    <div ref={containerRef} className={classes.objectGridContainer}>
      {containerWidth && columnCount && (
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
              />
            );
          }}
        </AutoSizer>
      )}
    </div>
  );
};

export const ObjectGrid = ObjectGridComponent;
