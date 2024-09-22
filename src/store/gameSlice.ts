import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Feature, Game, GameProvider, GameTheme } from '@shared/types';

export interface GameState {
    gamesInitial: Game[];
    categoriesInitial: Category[];
    featuresInitial: Feature[];
    themesInitial: GameTheme[];
    providersInitial: GameProvider[];
    totalPagesInitial: number;
}

const initialState: GameState = {
    gamesInitial: [],
    totalPagesInitial: 0,
    categoriesInitial: [],
    featuresInitial: [],
    themesInitial: [],
    providersInitial: []
};

const gameSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setInitialGames(state, action: PayloadAction<GameState>) {
            state.gamesInitial = action.payload.gamesInitial;
            state.totalPagesInitial = action.payload.totalPagesInitial;
            state.categoriesInitial = action.payload.categoriesInitial;
            state.featuresInitial = action.payload.featuresInitial;
            state.themesInitial = action.payload.themesInitial;
            state.providersInitial = action.payload.providersInitial;
        }
    },
});

export const { setInitialGames } = gameSlice.actions;
export default gameSlice.reducer;