import type { LayerProps } from "react-map-gl";
import { integraTheme } from "../../common/Theme";

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "datasetsMap",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": integraTheme.palette.primary.light,
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    "circle-opacity": 0.7,
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "datasetsMap",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
  paint: {
    "text-color": integraTheme.palette.primary.contrastText,
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  source: "datasetsMap",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": integraTheme.palette.primary.light,
    "circle-radius": 6,
    "circle-stroke-width": 1,
    "circle-stroke-color": integraTheme.palette.primary.contrastText,
    "circle-stroke-opacity": 0.7,
    "circle-opacity": 0.7,
  },
};

export const unclusteredPointTextLayer: any = (activeId: string) => {
  return {
    id: "unclustered-point-text",
    type: "symbol",
    source: "datasetsMap",
    filter: ["==", ["get", "id"], activeId],
    layout: {
      "text-field": ["get", "id"],
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
      "text-offset": [0, 1.5],
      "icon-allow-overlap": true,
      "text-anchor": "top",
    },
    paint: {
      "text-color": integraTheme.palette.primary.contrastText,
    },
  };
};

export const activeLayer: any = (activeId: string) => {
  return {
    id: "active-point",
    type: "circle",
    source: "datasetsMap",
    filter: ["==", ["get", "id"], activeId],
    layout: {
      "circle-sort-key": 0,
    },
    paint: {
      "circle-color": integraTheme.palette.secondary.main,
      "circle-radius": 10,
      "circle-stroke-width": 2,
      "circle-stroke-color": integraTheme.palette.primary.contrastText,
      "circle-allow-overlap": true,
    },
  };
};
