import { Game, GamesRequest } from "../shared/types";
import { ExternalGame, ExternalGameCategory } from "./types";

export const LIMIT_GAMES_PER_PAGE = 12;

export const getTotalPages = (games: Game[]) => Math.ceil(games.length / LIMIT_GAMES_PER_PAGE);

export const filterData = (gamesData: AWS.DynamoDB.DocumentClient.ScanOutput, filters: GamesRequest): ExternalGame[] => {
    let gameItems = (gamesData.Items || []) as ExternalGame[];
    if (!filters.features && !filters.themes) {
        return gameItems;
    }
    return  gameItems.filter((item: ExternalGame) => {
        const containFeatures = filters.features ? filters.features.every((feature: string) => item.features.includes(feature)) : true;
        const containThemes = filters.themes ? filters.themes.every((theme: string) => item.themes.includes(theme)) : true;
        return containFeatures && containThemes;
    });
};

export const mapGameFromDbForFrontend = (gameItems: ExternalGame[], offset?: number): Game[] => {
    gameItems = offset !== undefined ? gameItems.slice(offset, offset + LIMIT_GAMES_PER_PAGE) : gameItems;
    return gameItems.map((item: ExternalGame) => ({
        id: item.id,
        name: item.name,
        background: item.background,
        categories: item.cats.map((category: ExternalGameCategory) => ({ id: category.id, name: category.title }))
    }));
};