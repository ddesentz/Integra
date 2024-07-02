import type { LayerProps } from "react-map-gl";
import { integraTheme } from "../../../common/Theme";

export const exploreClusterLayer: LayerProps = {
  id: "explore-clusters",
  type: "circle",
  source: "datasetsMap",
  filter: ["has", "point_count"],
  layout: {
    "circle-sort-key": 1,
  },
  paint: {
    "circle-color": integraTheme.palette.primary.light,
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    "circle-opacity": 0.7,
  },
};

export const exploreClusterCountLayer: LayerProps = {
  id: "explore-cluster-count",
  type: "symbol",
  source: "exploreMap",
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

export const exploreUnclusteredPointLayer: LayerProps = {
  id: "explore-unclustered-point",
  type: "circle",
  source: "exploreMap",
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
    id: "explore-unclustered-point-text",
    type: "symbol",
    source: "exploreMap",
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

export const activeExploreObject: any = (activeId: string) => {
  return {
    id: "explore-active-point",
    type: "circle",
    source: "activePoints",
    filter: ["==", ["get", "id"], activeId],
    layout: {
      "circle-sort-key": 3,
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

export const activeExploreObjectText: any = (activeId: string) => {
  return {
    id: "explore-unclustered-point-text",
    type: "symbol",
    source: "exploreMap",
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
