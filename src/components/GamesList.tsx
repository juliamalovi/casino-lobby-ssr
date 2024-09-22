import { CircularProgress, Grid2, Pagination } from '@mui/material';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from 'src/store';
import { useGetGamesQuery } from '../store/api';
import CasinoError from './CasinoError';
import GameCard from './GameCard';
import { HandleChaneParamType, QueryParams } from './GamesWrapper';
import { Box } from '@mui/material';

interface GamesListProps {
    queryParams?: QueryParams;
    handleChangeParam: HandleChaneParamType;
}

const GamesList: React.FC<GamesListProps> = ({ queryParams, handleChangeParam }) => {
    const skippedFetch = !queryParams;
    const { data, error, isLoading } = useGetGamesQuery({
        page: queryParams?.page || 1,
        ...queryParams!
    }, { skip: skippedFetch });

    const gamesInitial = useSelector((state: RootStateType) => state.games.gamesInitial);
    const totalPagesInitial = useSelector((state: RootStateType) => state.games.totalPagesInitial);
    const gamesToDisplay = React.useMemo(() => skippedFetch ? gamesInitial : data?.games, [skippedFetch, gamesInitial, data?.games]);
    const pagesToDisplay = React.useMemo(() => skippedFetch ? totalPagesInitial : data?.totalPages, [skippedFetch, totalPagesInitial, data?.totalPages]);

    const handleChangeCategory = useCallback((category: string) => {
        handleChangeParam('category', category);
    }, [handleChangeParam]);

    const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        handleChangeParam('page', value);
    }, [handleChangeParam]);

    if (error) {
        return (<CasinoError message="Failed to fetch games. Please try again later." />);
    }

    return (
        <Box>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Grid2 container spacing={2}>
                    {gamesToDisplay?.length ? (
                        gamesToDisplay.map((game) => (
                            <Grid2 size={4} spacing={4} key={game.id}>
                                <GameCard game={game} selectCategory={handleChangeCategory} />
                            </Grid2>
                        ))
                    ) : (
                        <Grid2 size={12}>
                            <Box textAlign="center" py={4}>
                                No games available. Please try different search criteria.
                            </Box>
                        </Grid2>
                    )}
                </Grid2>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination count={pagesToDisplay} page={queryParams?.page || 1} onChange={handlePageChange} />
            </Box>
        </Box>
    );
}

export default GamesList;