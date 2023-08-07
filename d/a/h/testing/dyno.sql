ALTER PROCEDURE DynamicUpdateProcedureThree 
    @tableName NVARCHAR(128),
    @newValue NVARCHAR(128),
    @conditionValue NVARCHAR(128),
    @Age int
AS
/*
DECLARE @tableName NVARCHAR(128) = 'Georgia',
        @newValue NVARCHAR(128) = 'Changed',
        @conditionValue NVARCHAR(128) = '1',
        @age INT = 25;

EXEC DynamicUpdateProcedureThree @tableName, @newValue, @conditionValue, @age;

SELECT * FROM [testOne].[dbo].[Georgia];
*/
BEGIN
    DECLARE @sqlCommand NVARCHAR(1000)

    IF @tableName = 'Georgia'
    BEGIN
        SET @sqlCommand = N'UPDATE [testOne].[dbo].[Georgia] SET Name = N''' + @newValue + N''', Age = ' + CAST(@Age AS NVARCHAR(10)) + N' WHERE Id = ' + @conditionValue
    END
    ELSE IF @tableName = 'Florida'
    BEGIN
        SET @sqlCommand = N'UPDATE [testOne].[dbo].[Florida] SET Name = N''' + @newValue + N''', Age = ' + CAST(@Age AS NVARCHAR(10)) + N' WHERE Id = ' + @conditionValue
    END

    EXECUTE sp_executesql @sqlCommand
END
