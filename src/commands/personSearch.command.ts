import { Telegraf } from "telegraf";
import { Command } from "../abstracts/command.class";
import { ErrorHelper } from "../helpers/error.helper";
import { IBotContext } from "../interfaces/context.interface";
import { PERSON_SEARCH_COMMAND } from "../constants/commands.constants";
import { PERSON_SEARCH_SCENE } from "../constants/scenes.constants";

export class PersonSearchCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command(PERSON_SEARCH_COMMAND, this.sendCommandMessage);
  }

  private async sendCommandMessage(ctx: IBotContext) {
    try {
      return await ctx.scene.enter(PERSON_SEARCH_SCENE);
    } catch (error: unknown) {
      new ErrorHelper().sendInternalError(ctx, error);
    }
  }
}
