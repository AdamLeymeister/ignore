import React from 'react';

const Test = () => {
    const queries = [
        { key: 'queryOne', fn: queryOne },
        { key: 'queryTwo', fn: queryTwo },
        { key: 'queryThree', fn: queryThree },
    ];

    const { results, isLoading, error, invalidateQuery } = useSequentialQueries(queries);


    return (
        <></>
    );
};

export default Test;
