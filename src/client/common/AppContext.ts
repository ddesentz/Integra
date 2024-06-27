import * as React from "react";
import { IRootSignals } from "../signals/RootSignals";

export const AppSignals = React.createContext<IRootSignals | null>(null);
export const useAppSignals = () => {
  const signals = React.useContext(AppSignals);
  if (!signals) {
    throw new Error("Provider Missing!");
  }
  return signals;
};
