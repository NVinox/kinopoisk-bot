import axios from "axios";
import { ConfigService } from "../config/config.service";
import { IPersonSearchResponse } from "../interfaces/person.interface";
import {
  API_PERSON_URL,
  API_PERSON_SEARCH_URL,
} from "../constants/api.constants";

const API_INSTANCE = axios.create({
  baseURL: API_PERSON_URL,
  headers: {
    "X-API-KEY": new ConfigService().get("X-API-KEY"),
    "Content-Type": "application/json",
  },
});

export class APIPerson {
  static async search(
    query: string,
    page: number = 1
  ): Promise<IPersonSearchResponse> {
    const { data } = await API_INSTANCE.get(API_PERSON_SEARCH_URL, {
      params: {
        query,
        page,
        limit: 1,
      },
    });

    return data;
  }
}
