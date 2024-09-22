import buildUrlWithParams from "./buildUrlWithParams";
import { HttpMethods } from "./types";
import { GamesRequest } from "@shared/types";

export const getGamesEndpoint = (args: GamesRequest) => ({
  method: HttpMethods.GET,
  url: buildUrlWithParams("games", args),
});