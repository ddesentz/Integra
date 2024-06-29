import { signal } from "@preact/signals-react";

const createRootSignals = () => {
  const datasetPath = signal<string[]>([]);
  return { datasetPath };
};

export const rootSignals = {
  rootSignals: createRootSignals(),
};

export type IRootSignals = typeof rootSignals;
