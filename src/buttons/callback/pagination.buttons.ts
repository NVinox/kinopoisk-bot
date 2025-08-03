import { Markup } from "telegraf";
import { Markup as Markups } from "telegraf/typings/markup";
import {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
} from "telegraf/typings/core/types/typegram";
import {
  PAGINATE_END_ICON,
  PAGINATE_NEXT_ICON,
  PAGINATE_PREV_ICON,
  PAGINATE_START_ICON,
} from "../../constants/emoji.constants";

export class PaginationButtons {
  constructor(
    private readonly startData: string,
    private readonly prevData: string,
    private readonly nextData: string,
    private readonly endData: string
  ) {}

  getButtons(
    currentPage: number,
    totalPages: number
  ): Markups<InlineKeyboardMarkup> {
    let paginationCallbacks: InlineKeyboardButton.CallbackButton[] = [];

    if (currentPage === 1 && currentPage !== totalPages) {
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_NEXT_ICON, this.nextData)
      );
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_END_ICON, this.endData)
      );
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_START_ICON, this.startData)
      );
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_PREV_ICON, this.prevData)
      );
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_NEXT_ICON, this.nextData)
      );
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_END_ICON, this.endData)
      );
    }

    if (currentPage === totalPages) {
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_START_ICON, this.startData)
      );
      paginationCallbacks.push(
        Markup.button.callback(PAGINATE_PREV_ICON, this.prevData)
      );
    }

    return Markup.inlineKeyboard([...paginationCallbacks]);
  }
}
