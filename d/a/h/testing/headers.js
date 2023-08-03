import React, { useEffect, useRef, useState } from 'react';
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { mockData } from './mock.js';

const flattenData = (data) => {
  return Object.entries(data).flatMap(([parent, categories]) => 
    categories.flatMap(category => 
      category.players.map(player => 
        ({...player, parent})
      )
    )
  );
}

function TableOne() {
    const [selectedRow, setSelectedRow] = useState(null); 
    const [data, setData] = useState(flattenData(mockData));
    const tableRef = useRef();
    let tabulatorInstance = null; // To hold the Tabulator instance

    useEffect(() => {
        console.log(data)
    }, [data]);

    const columns = [
        { title: 'Name', field: 'name', width: 200 },
        { title: 'Age', field: 'age', align: 'left', formatter: 'number' },
        { title: 'Parent', field: 'parent' },
    ];

    useEffect(() => {
        tabulatorInstance = new Tabulator(tableRef.current, {
            data: data,
            columns: columns,
            rowClick: function(e, row) {
                setSelectedRow(row.getData()); 
            },
        });
    }, []);

    const handleClick = () => {
        tabulatorInstance.setGroupBy('parent') 
        console.log(tabulatorInstance)
    }

    return (
        <div>
            <div ref={tableRef} />
            <button onClick={handleClick}>Click me</button>
            <pre>
                {JSON.stringify(selectedRow, null, 2)}
            </pre>
        </div>
    );
}

export default TableOne;

CREATE PROCEDURE DynamicTableWrite
    @TableName NVARCHAR(128),
    @Data NVARCHAR(1000)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    IF @TableName = 'Table1'
    BEGIN
        SET @SQL = N'INSERT INTO Table1 (Column1) VALUES (@Data)';
    END
    ELSE IF @TableName = 'Table2'
    BEGIN
        SET @SQL = N'INSERT INTO Table2 (Column1, Column2) VALUES (@Data, @Data)';
    END
    ELSE
    BEGIN
        THROW 50000, 'Invalid table name', 1;
    END

    -- Execute the dynamic SQL
    EXEC sp_executesql @SQL, N'@Data NVARCHAR(1000)', @Data = @Data;
END




CREATE PROCEDURE DynamicUpdateProcedure
    @tableName NVARCHAR(128),
    @colName NVARCHAR(128),
    @newValue NVARCHAR(128),
    @condition NVARCHAR(128),
    @conditionValue NVARCHAR(128)
AS
BEGIN
    DECLARE @sqlCommand NVARCHAR(1000)

    IF @tableName = 'Table1'
    BEGIN
        SET @sqlCommand = N'UPDATE ' + @tableName + N' SET ' + @colName + N' = ' + @newValue + N' WHERE ' + @condition + N' = ' + @conditionValue
        EXECUTE sp_executesql @sqlCommand
    END
    ELSE IF @tableName = 'Table2'
    BEGIN
        SET @sqlCommand = N'UPDATE ' + @tableName + N' SET ' + @colName + N' = ' + @newValue + N' WHERE ' + @condition + N' = ' + @conditionValue
        EXECUTE sp_executesql @sqlCommand
    END
END
