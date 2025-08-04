import { Telegraf } from "telegraf"
import { ErrorHelper } from "../helpers/error.helper"
import { Command } from "../abstracts/command.class"
import { IBotContext } from "../interfaces/context.interface"
import { HELP_COMMAND_TEXT } from "../constants/text.constants"

export class HelpCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.help(this.sendCommandMessage)
  }

  private async sendCommandMessage(ctx: IBotContext) {
    try {
      return await ctx.replyWithHTML(HELP_COMMAND_TEXT)
    } catch (error: unknown) {
      new ErrorHelper().sendInternalError(ctx, error)
    }
  }
}
