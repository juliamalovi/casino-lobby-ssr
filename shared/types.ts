import { z } from 'zod';

export const CategorySchema = z.object({
    id: z.string(),
    name: z.string()
});
export type Category = z.infer<typeof CategorySchema>;

export const GameProviderSchema = z.object({
    id: z.string(),
    name: z.string()
});
export type GameProvider = z.infer<typeof GameProviderSchema>;

export const FeatureSchema = z.object({
    id: z.string(),
    name: z.string()
});
export type Feature = z.infer<typeof FeatureSchema>;

export const GameThemeSchema = z.object({
    id: z.string(),
    name: z.string()
});
export type GameTheme = z.infer<typeof GameThemeSchema>;

export const GameSchema = z.object({
    id: z.string(),
    name: z.string(),
    categories: z.array(CategorySchema),
    background: z.string()
});
export type Game = z.infer<typeof GameSchema>;

export const GamesResponseSchema = z.object({
    games: z.array(GameSchema),
    totalPages: z.number()
});
export type GamesResponse = z.infer<typeof GamesResponseSchema>;

export const GetGamesRequestSchema = z.object({
    page: z.number(),
    category: z.string().optional(),
    providers: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    themes: z.array(z.string()).optional(),
    search: z.string().optional(),
});

export type GamesRequest = z.infer<typeof GetGamesRequestSchema>;