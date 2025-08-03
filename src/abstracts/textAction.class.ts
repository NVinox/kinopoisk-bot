import { Telegraf } from "telegraf";
import { IBotContext } from "../interfaces/context.interface";

export abstract class TextAction {
  constructor(public bot: Telegraf<IBotContext>) {}
  abstract handler(): void;
}
