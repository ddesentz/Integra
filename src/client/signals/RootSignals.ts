import { signal } from "@preact/signals-react";

const createRootSignals = () => {
  const collectionPath = signal<string[]>([]);
  return { collectionPath };
};

export const rootSignals = {
  rootSignals: createRootSignals(),
};

export type IRootSignals = typeof rootSignals;
