import { Scenes, Telegraf } from "telegraf";
import { IBotContext } from "../interfaces/context.interface";

export abstract class WizardScene {
  constructor(public bot: Telegraf<IBotContext>) {}
  abstract getScene(): Scenes.WizardScene<IBotContext>;
}
