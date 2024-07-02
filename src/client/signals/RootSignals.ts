import { signal } from "@preact/signals-react";

const createRootSignals = () => {
  const datasetPath = signal<string[]>([]);
  const viewMapExplore = signal<boolean>(false);
  const viewMapDatasets = signal<boolean>(true);
  const mapData = signal<any>(null);
  const activeObject = signal<any>(null);
  return {
    datasetPath,
    viewMapExplore,
    viewMapDatasets,
    mapData,
    activeObject,
  };
};

export const rootSignals = {
  rootSignals: createRootSignals(),
};

export type IRootSignals = typeof rootSignals;
