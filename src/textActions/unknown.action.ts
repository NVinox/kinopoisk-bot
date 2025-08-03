import { Telegraf } from "telegraf";
import { TextAction } from "../abstracts/textAction.class";
import { IBotContext } from "../interfaces/context.interface";
import { ErrorHelper } from "../helpers/error.helper";
import { UNKNOWN_COMMAND_TEXT } from "../constants/text.constants";

export class UnknownAction extends TextAction {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handler(): void {
    this.bot.on("text", this.sendMessage);
  }

  private async sendMessage(ctx: IBotContext) {
    try {
      return await ctx.reply(UNKNOWN_COMMAND_TEXT);
    } catch (error: unknown) {
      new ErrorHelper().sendInternalError(ctx, error);
    }
  }
}
