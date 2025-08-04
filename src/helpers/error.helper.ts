import { createLogger, format, transports, Logger } from "winston"
import { Message } from "telegraf/typings/core/types/typegram"
import { IBotContext } from "../interfaces/context.interface"
import { INTERNAL_MESSAGE } from "../constants/error.constants"

interface IErrorHelper {
  sendInternalError(
    ctx: IBotContext,
    error: unknown
  ): Promise<Message.TextMessage>
  sendWizardSceneError(ctx: IBotContext, error: unknown): Promise<void>
}

export class ErrorHelper implements IErrorHelper {
  async sendInternalError(ctx: IBotContext, error: unknown) {
    console.log(error)
    this.getLogger().error({ message: error })
    return await ctx.reply(INTERNAL_MESSAGE, { parse_mode: "HTML" })
  }

  async sendWizardSceneError(ctx: IBotContext, error: unknown): Promise<void> {
    console.log(error)
    this.getLogger().error({ message: error })
    await ctx.reply(INTERNAL_MESSAGE, { parse_mode: "HTML" })
    await ctx.scene.reenter()
  }

  private getLogger(): Logger {
    const { combine, label, timestamp, prettyPrint } = format

    return createLogger({
      level: "error",
      format: combine(label({ label: "Error" }), timestamp(), prettyPrint()),
      transports: [
        new transports.File({
          dirname: "logs",
          filename: this.createLoggerFileNameDate(),
          level: "error",
        }),
      ],
    })
  }

  private createLoggerFileNameDate(): string {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    let day: number | string = currentDate.getDate()
    let month: number | string = currentDate.getMonth() + 1

    if (month < 10) {
      month = `0${month}`
    }

    if (day < 10) {
      day = `0${day}`
    }

    return `${day}.${month}.${year}.log`
  }
}
