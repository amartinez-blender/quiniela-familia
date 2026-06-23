import { createContext, useContext } from "react";
import type { WorldCupData } from "../types/api";

type DataContextValue = {
  data: WorldCupData;
  refreshing: boolean;
  refresh: () => void;
};

export const DataContext = createContext<DataContextValue | null>(null);
export const useWorldCupData = () => {
  const value = useContext(DataContext);
  if (!value) throw new Error("useWorldCupData debe usarse dentro de DataContext");
  return value;
};
