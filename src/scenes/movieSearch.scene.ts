import { Markup, Scenes, Telegraf } from "telegraf"
import { IBotContext } from "../interfaces/context.interface"
import { MOVIE_SEARCH_SCENE } from "../constants/scenes.constants"
import { WizardScene } from "../abstracts/wizardScene.class"
import { ErrorHelper } from "../helpers/error.helper"
import { AsyncMessage } from "../helpers/asyncMessage.helper"
import { APIMovies } from "../API/movie.api"
import { ENTER_MOVIE_TITLE } from "../constants/movie.constants"
import { MoviesService } from "../services/movies.service"
import { IMovieSearchResponse } from "../interfaces/movie.interface"
import { PaginationButtons } from "../buttons/callback/pagination.buttons"
import { MoviePaginationCallback } from "../callbacks/moviePagination.callback"
import { CancelKeyboard } from "../buttons/keyboard/cancel.keyboard"
import { CANCEL_TEXT, LEAVE_SCENE_TEXT } from "../constants/text.constants"
import {
  MOVIE_END_DATA,
  MOVIE_NEXT_DATA,
  MOVIE_PREV_DATA,
  MOVIE_START_DATA,
} from "../constants/callbackData.constants"

export class MovieSearchScene extends WizardScene {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot)
  }

  getScene() {
    return new Scenes.WizardScene<IBotContext>(
      MOVIE_SEARCH_SCENE,
      (ctx: IBotContext) => {
        this.start(ctx)
      },
      (ctx: IBotContext) => {
        this.sendMovies(ctx)
      }
    )
  }

  protected async start(ctx: IBotContext) {
    try {
      await ctx.replyWithHTML(ENTER_MOVIE_TITLE, CancelKeyboard.getKeyboard())
      return await ctx.wizard.next()
    } catch (error: unknown) {
      new ErrorHelper().sendWizardSceneError(ctx, error)
    }
  }

  private async sendMovies(ctx: IBotContext) {
    try {
      if (ctx.text === CANCEL_TEXT) {
        await ctx.replyWithHTML(LEAVE_SCENE_TEXT, Markup.removeKeyboard())
        return await ctx.scene.leave()
      }

      const query = ctx.text!
      const { docs, page, pages } =
        await AsyncMessage.sendWithProgress<IMovieSearchResponse>(
          () => APIMovies.search(query),
          ctx
        )
      const movie = docs[0]
      const messageId = ctx.message?.message_id
      const startCallbackData = `${MOVIE_START_DATA}-${messageId}`
      const prevCallbackData = `${MOVIE_PREV_DATA}-${messageId}`
      const nextCallbackData = `${MOVIE_NEXT_DATA}-${messageId}`
      const endCallbackData = `${MOVIE_END_DATA}-${messageId}`

      if (movie) {
        const movieService = new MoviesService(movie, page, pages)

        await ctx.replyWithPhoto(movieService.getPhoto(), {
          caption: movieService.getPhotoCaption(),
          parse_mode: "HTML",
          reply_markup: new PaginationButtons(
            startCallbackData,
            prevCallbackData,
            nextCallbackData,
            endCallbackData
          ).getButtons(page, pages).reply_markup,
        })

        new MoviePaginationCallback(this.bot, {
          startCallbackData,
          prevCallbackData,
          nextCallbackData,
          endCallbackData,
          query,
          currentPage: page,
          totalPages: pages,
        }).init()
      } else {
        await ctx.replyWithHTML(
          `Фильм '${query}' не найден`,
          Markup.removeKeyboard()
        )
      }

      return await ctx.scene.leave()
    } catch (error: unknown) {
      new ErrorHelper().sendWizardSceneError(ctx, error)
    }
  }
}
