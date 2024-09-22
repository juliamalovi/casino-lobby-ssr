import React, { useCallback, useState } from 'react'
import Filters from './filters/Filters'
import GamesList from './GamesList'

export interface QueryParams {
    category?: string;
    search?: string;
    features?: string[];
    themes?: string[];
    providers?: string[];
    page?: number;
}

export type HandleChaneParamType = (key: keyof QueryParams, value: QueryParams[keyof QueryParams] | undefined) => void;

const GamesWrapper = () => {
    const [queryParams, setQueryParams] = useState<QueryParams | undefined>();

    const handleChangeParam = useCallback((key: keyof QueryParams, value: QueryParams[keyof QueryParams] | undefined) => {
        setQueryParams((prevParams: QueryParams | undefined) => {
            const newParams = !prevParams ? { [key]: value } : ({
                ...prevParams,
                [key]: value,
            });
            if (key !== 'page') {
                newParams.page = 1;
            }
            return newParams;
        });
    }, [setQueryParams]);

    const handleReset = useCallback(() => {
        setQueryParams(undefined);
    }, [setQueryParams]);

    return (
        <>
            <Filters queryParams={queryParams} handleChangeParam={handleChangeParam} resetParams={handleReset} />
            <GamesList queryParams={queryParams} handleChangeParam={handleChangeParam} />
        </>
    )
}

export default GamesWrapper