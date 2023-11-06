import { useRef, useEffect } from "react";
import Tabulator from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

const useTabulator = ({ columns, data, isOpen }) => {
  const tableRef = useRef(null);
  const tabulatorInstance = useRef(null);

  useEffect(() => {
    if (isOpen && tableRef.current && !tabulatorInstance.current) {
      tabulatorInstance.current = new Tabulator(tableRef.current, {
        data: data || [],
        columns: columns,
        layout: "fitColumns",
        selectable: true,
      });
    }

    // Update table data when data prop changes
    if (tabulatorInstance.current) {
      tabulatorInstance.current.replaceData(data);
    }

    // Cleanup on dismount
    return () => {
      if (tabulatorInstance.current) {
        tabulatorInstance.current.destroy();
        tabulatorInstance.current = null;
      }
    };
  }, [isOpen, data, columns]);

  return [tableRef, tabulatorInstance];
};

export default useTabulator;
