import { signal } from "@preact/signals-react";

const createRootSignals = () => {
  const datasetPath = signal<string[]>([]);
  const viewMapExplore = signal<boolean>(true);
  const viewMapDatasets = signal<boolean>(true);
  const datasetsMapData = signal<any>(null);
  const exploreMapData = signal<any>(null);
  const activeObject = signal<any>(null);
  const exploreFocusObject = signal<any>(null);
  const exploreScrollObject = signal<any>(null);
  return {
    datasetPath,
    viewMapExplore,
    viewMapDatasets,
    datasetsMapData,
    exploreMapData,
    activeObject,
    exploreFocusObject,
    exploreScrollObject,
  };
};

export const rootSignals = {
  rootSignals: createRootSignals(),
};

export type IRootSignals = typeof rootSignals;
