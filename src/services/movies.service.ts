import { StringHelper } from "../helpers/string.helper"
import { DateHelper } from "../helpers/date.helper"
import { PaginationHelper } from "../helpers/pagination.helper"
import { IMovieSearchDoc } from "../interfaces/movie.interface"
import { PHOTO_TEMPLATE } from "../constants/images.constants"

export class MoviesService {
  constructor(
    private readonly movie: IMovieSearchDoc,
    private readonly currentPage: number,
    private readonly totalPages: number
  ) {}

  getPhoto(): string {
    if (this.movie?.poster?.previewUrl) {
      return this.movie.poster.previewUrl
    }

    if (this.movie?.poster?.url) {
      return this.movie.poster.url
    }

    if (this.movie?.logo?.url) {
      return this.movie.logo.url
    }

    return PHOTO_TEMPLATE
  }

  getPhotoCaption(): string {
    return StringHelper.insertStringDelimeter(
      "\n\n",
      this.getMovieTitle(),
      this.getGenres(),
      this.getMovieLength(),
      StringHelper.cutText(this.getDescription()),
      PaginationHelper.getProgress(this.currentPage, this.totalPages)
    )
  }

  private getMovieTitle(): string {
    let title = ""

    if (this.movie.name) {
      title = this.movie.name
    }

    if (this.movie.year) {
      title += ` (${this.movie.year})`
    }

    return title
  }

  private getMovieLength(): string {
    if (this.movie.movieLength) {
      return `Продолжительность: ${new DateHelper().convertMinutesToString(
        this.movie.movieLength
      )}`
    }
    return ""
  }

  private getGenres(): string {
    if (this.movie.genres.length) {
      return `Жанр: ${this.movie.genres
        .reduce<string[]>((acc, genre) => {
          acc.push(genre.name)
          return acc
        }, [])
        .join(", ")}`
    }
    return ""
  }

  private getDescription(): string {
    return this.getShortDescription() || this.getLongDescription()
  }

  private getLongDescription(): string {
    if (this.movie.description) {
      return `Описание: ${this.movie.description}`
    }
    return ""
  }

  private getShortDescription(): string {
    if (this.movie.shortDescription) {
      return `Описание: ${this.movie.shortDescription}`
    }
    return ""
  }
}
