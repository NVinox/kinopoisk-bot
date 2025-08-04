import { Markup } from "telegraf"
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"
import { CANCEL_TEXT } from "../../constants/text.constants"

export class CancelKeyboard {
  static getKeyboard(): Markup.Markup<ReplyKeyboardMarkup> {
    return Markup.keyboard([CANCEL_TEXT]).oneTime().resize()
  }
}
