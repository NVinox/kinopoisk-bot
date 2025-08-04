import { Telegraf } from "telegraf"
import { IBotContext } from "../interfaces/context.interface"
import { PaginationCallback } from "../abstracts/paginationCallback.class"
import { ErrorHelper } from "../helpers/error.helper"
import { APIMovies } from "../API/movie.api"
import { MoviesService } from "../services/movies.service"
import { PaginationButtons } from "../buttons/callback/pagination.buttons"
import { IPaginationCallbackParameters } from "../interfaces/pagination.interface"

export class MoviePaginationCallback extends PaginationCallback {
  constructor(
    public bot: Telegraf<IBotContext>,
    public parameters: IPaginationCallbackParameters
  ) {
    super(bot)
  }

  init(): void {
    this.start()
    this.prev()
    this.next()
    this.end()
  }

  protected start(): void {
    this.bot.action(
      this.parameters.startCallbackData,
      this.startHandler.bind(this)
    )
  }

  protected prev(): void {
    this.bot.action(
      this.parameters.prevCallbackData,
      this.prevHandler.bind(this)
    )
  }

  protected next(): void {
    this.bot.action(
      this.parameters.nextCallbackData,
      this.nextHandler.bind(this)
    )
  }

  protected end(): void {
    this.bot.action(this.parameters.endCallbackData, this.endHandler.bind(this))
  }

  private async startHandler(ctx: IBotContext) {
    try {
      this.parameters.currentPage = 1
      const { docs, page, pages } = await APIMovies.search(
        this.parameters.query,
        1
      )
      const movie = docs[0]
      const movieService = new MoviesService(movie, page, pages)

      await ctx.editMessageMedia(
        {
          media: movieService.getPhoto(),
          caption: movieService.getPhotoCaption(),
          type: "photo",
        },
        {
          reply_markup: new PaginationButtons(
            this.parameters.startCallbackData,
            this.parameters.prevCallbackData,
            this.parameters.nextCallbackData,
            this.parameters.endCallbackData
          ).getButtons(page, pages).reply_markup,
        }
      )
    } catch (error: unknown) {
      new ErrorHelper().sendInternalError(ctx, error)
    }
  }

  private async prevHandler(ctx: IBotContext) {
    try {
      this.parameters.currentPage--
      const { docs, page, pages } = await APIMovies.search(
        this.parameters.query,
        this.parameters.currentPage
      )
      const movie = docs[0]
      const movieService = new MoviesService(movie, page, pages)

      await ctx.editMessageMedia(
        {
          media: movieService.getPhoto(),
          caption: movieService.getPhotoCaption(),
          type: "photo",
        },
        {
          reply_markup: new PaginationButtons(
            this.parameters.startCallbackData,
            this.parameters.prevCallbackData,
            this.parameters.nextCallbackData,
            this.parameters.endCallbackData
          ).getButtons(page, pages).reply_markup,
        }
      )
    } catch (error: unknown) {
      new ErrorHelper().sendInternalError(ctx, error)
    }
  }

  private async nextHandler(ctx: IBotContext) {
    try {
      this.parameters.currentPage++
      const { docs, page, pages } = await APIMovies.search(
        this.parameters.query,
        this.parameters.currentPage
      )
      const movie = docs[0]
      const movieService = new MoviesService(movie, page, pages)

      await ctx.editMessageMedia(
        {
          media: movieService.getPhoto(),
          caption: movieService.getPhotoCaption(),
          type: "photo",
        },
        {
          reply_markup: new PaginationButtons(
            this.parameters.startCallbackData,
            this.parameters.prevCallbackData,
            this.parameters.nextCallbackData,
            this.parameters.endCallbackData
          ).getButtons(page, pages).reply_markup,
        }
      )
    } catch (error: unknown) {
      new ErrorHelper().sendInternalError(ctx, error)
    }
  }

  private async endHandler(ctx: IBotContext) {
    try {
      this.parameters.currentPage = this.parameters.totalPages
      const { docs, page, pages } = await APIMovies.search(
        this.parameters.query,
        this.parameters.totalPages
      )
      const movie = docs[0]
      const movieService = new MoviesService(movie, page, pages)

      await ctx.editMessageMedia(
        {
          media: movieService.getPhoto(),
          caption: movieService.getPhotoCaption(),
          type: "photo",
        },
        {
          reply_markup: new PaginationButtons(
            this.parameters.startCallbackData,
            this.parameters.prevCallbackData,
            this.parameters.nextCallbackData,
            this.parameters.endCallbackData
          ).getButtons(page, pages).reply_markup,
        }
      )
    } catch (error: unknown) {
      new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
