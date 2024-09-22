
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getGamesEndpoint } from './endpoints';
import { GamesResponse, GamesRequest } from '@shared/types';
import buildIdForTag from './buildIdForTag';

export enum AppTags {
    GAMES_TAG = 'GAMES_TAG'
}

const TAG_TYPES = [AppTags.GAMES_TAG];
export const API_REDUCER_KEY = 'api';
const BASE_API_URL = 'http://localhost:3006/api/';

export const api = createApi({
    tagTypes: TAG_TYPES,
    reducerPath: API_REDUCER_KEY,
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
    }),
    endpoints: (builder) => ({
        getGames: builder.query<
            GamesResponse,
            GamesRequest
        >({
            query: getGamesEndpoint,
            providesTags: (_result, _error, params) => [{ type: AppTags.GAMES_TAG, id: buildIdForTag<GamesRequest>(params) }],
        }),
    }),
});

export const {
    useGetGamesQuery,
} = api;