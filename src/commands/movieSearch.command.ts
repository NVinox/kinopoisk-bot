import { Telegraf } from "telegraf"
import { Command } from "../abstracts/command.class"
import { IBotContext } from "../interfaces/context.interface"
import { MOVIE_SEARCH_COMMAND } from "../constants/commands.constants"
import { ErrorHelper } from "../helpers/error.helper"
import { MOVIE_SEARCH_SCENE } from "../constants/scenes.constants"

export class MovieSearchCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.command(MOVIE_SEARCH_COMMAND, this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    try {
      return await ctx.scene.enter(MOVIE_SEARCH_SCENE)
    } catch (error: unknown) {
      new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
