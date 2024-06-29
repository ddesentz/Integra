import { signal } from "@preact/signals-react";

const createRootSignals = () => {
  const datasetPath = signal<string[]>([]);
  const viewMap = signal<boolean>(false);
  const mapData = signal<any>(null);
  const activeObject = signal<any>(null);
  return { datasetPath, viewMap, mapData, activeObject };
};

export const rootSignals = {
  rootSignals: createRootSignals(),
};

export type IRootSignals = typeof rootSignals;
