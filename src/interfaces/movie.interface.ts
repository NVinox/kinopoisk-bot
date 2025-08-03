interface IName {
  name: string;
  language?: string;
  type?: string;
}

interface IGenre {
  name: string;
}

interface ICountry {
  name: string;
}

interface IReleaseYear {
  start: number;
  end: number;
}

export interface IMovieSearchDoc {
  id: number;
  name?: string;
  alternativeName: string;
  enName: string;
  type: string;
  year?: number;
  description?: string;
  shortDescription?: string;
  movieLength?: number;
  names?: IName[];
  externalId?: {
    kpHD?: string;
    imdb?: string;
    tmdb?: number;
  };
  logo?: { url?: string };
  poster?: { url?: string; previewUrl?: string };
  backdrop?: { url?: string; previewUrl?: string };
  rating: {
    kp: number;
    imdb: number;
    tmdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  votes: {
    kp: string;
    imdb: number;
    tmdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  genres: IGenre[];
  countries: ICountry[];
  releaseYears: IReleaseYear[];
  isSeries: boolean;
  ticketsOnSale: boolean;
  totalSeriesLength: number;
  seriesLength: number;
  ratingMpaa: string;
  ageRating: number;
  top10: number;
  top250: number;
  typeNumber: number;
  status: string;
}

export interface IMovieSearchResponse {
  docs: IMovieSearchDoc[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
