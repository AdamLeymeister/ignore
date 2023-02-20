import create from "zustand";
import { createHeaders, createRows } from "../../modalButton/KeypadTable";

const useKeys = create((set) => ({
  keys: [],
  keyComps: { tableHeaders: [], tableRows: [] },
  updatedKeys: [],
  setKeys: (keys) => set({ keys }),
  updateKey: (updateIdx, valueIndex) =>
    set((ps) => {
      let ns = { ...ps };
      ns.keys = [...ps.keys];

      const updateIndex = ns.keys.findIndex((row) => {
        let result = false;
        if (row.id == updateIdx.id) {
          result = true;
        }
        return result;
      });

      if (updateIndex >= 0) {
        ns.keys[updateIndex] = ps.keys[updateIndex];
        ns.keys[updateIndex].values[valueIndex] = updateIdx.values[valueIndex];
        ns.keyComps.tableHeaders = ns.keys[0].values.map(createHeaders);
        ns.keyComps.tableRows = ns.keys.map(createRows);
      } 
      return ns;
    }),

  createTable: (keys) =>
    set((state) => {
      let ns = { ...state };
      ns.keyComps.tableHeaders = keys[0].values.map(createHeaders);
      ns.keyComps.tableRows = keys.map(createRows);
      ns.updatedData = keys;
      return ns;
    }),
}));
export { useKeys };
