import { Markup } from "telegraf"
import { IBotContext } from "../interfaces/context.interface"

export class AsyncMessage {
  static async sendWithProgress<T>(
    cb: () => Promise<T>,
    ctx: IBotContext,
    isDeleteKeyboard: boolean = true
  ) {
    let messageId: number
    if (isDeleteKeyboard) {
      messageId = (await ctx.reply("Идет поиск...", Markup.removeKeyboard()))
        .message_id
    } else {
      messageId = (await ctx.reply("Идет поиск...")).message_id
    }
    const data = await cb()
    await ctx.deleteMessage(messageId)

    return data
  }
}
