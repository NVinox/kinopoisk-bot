import axios from "axios";
import {
  API_MOVIE_SEARCH_URL,
  API_MOVIE_URL,
} from "../constants/api.constants";
import { ConfigService } from "../config/config.service";
import { IMovieSearchResponse } from "../interfaces/movie.interface";

const API_INSTANCE = axios.create({
  baseURL: API_MOVIE_URL,
  headers: {
    "X-API-KEY": new ConfigService().get("X-API-KEY"),
    "Content-Type": "application/json",
  },
});

export class APIMovies {
  static async search(
    query: string,
    page: number = 1
  ): Promise<IMovieSearchResponse> {
    const { data } = await API_INSTANCE.get(API_MOVIE_SEARCH_URL, {
      params: {
        query,
        page,
        limit: 1,
      },
    });

    return data;
  }
}
