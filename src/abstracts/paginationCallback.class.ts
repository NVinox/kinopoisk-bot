import { Telegraf } from "telegraf";
import { IBotContext } from "../interfaces/context.interface";

export interface IProps {
  bot: Telegraf<IBotContext>;
}

export abstract class PaginationCallback {
  constructor(public bot: Telegraf<IBotContext>) {}

  abstract init(): void;

  protected abstract start(): void;
  protected abstract prev(): void;
  protected abstract next(): void;
  protected abstract end(): void;
}
