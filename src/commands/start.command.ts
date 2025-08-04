import { Telegraf } from "telegraf"
import { ErrorHelper } from "../helpers/error.helper"
import { Command } from "../abstracts/command.class"
import { IBotContext } from "../interfaces/context.interface"

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.start(this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    try {
      return await ctx.replyWithHTML(
        `Привет, ${ctx.message?.from.first_name}!\nЭто бот для работы с фильмами.`
      )
    } catch (error: unknown) {
      new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
