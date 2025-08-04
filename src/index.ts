import { Scenes, session, Telegraf } from "telegraf"
import { IConfigService } from "./interfaces/config.interface"
import { IBotContext } from "./interfaces/context.interface"
import { ConfigService } from "./config/config.service"
import { Command } from "./abstracts/command.class"
import { TextAction } from "./abstracts/textAction.class"
import { CommandsButtons } from "./buttons/commands/commands.buttons"
import { StartCommand } from "./commands/start.command"
import { MovieSearchCommand } from "./commands/movieSearch.command"
import { PersonSearchCommand } from "./commands/personSearch.command"
import { MovieSearchScene } from "./scenes/movieSearch.scene"
import { PersonSearchScene } from "./scenes/personSearch.scene"
import { UnknownAction } from "./textActions/unknown.action"
import { HelpCommand } from "./commands/help.command"

class Bot {
  private stage: Scenes.Stage<IBotContext, Scenes.SceneSessionData>
  bot: Telegraf<IBotContext>
  commands: Command[] = []
  textActions: TextAction[] = []

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"))
    this.stage = new Scenes.Stage<IBotContext>([
      new MovieSearchScene(this.bot).getScene(),
      new PersonSearchScene(this.bot).getScene(),
    ])

    this.bot.use(session())
    this.bot.use(this.stage.middleware())
    this.bot.launch()
  }

  init() {
    this.setCommands()
    this.setTextActions()
  }

  private setCommands() {
    this.bot.telegram.setMyCommands(new CommandsButtons().get())

    this.commands = [
      new StartCommand(this.bot),
      new MovieSearchCommand(this.bot),
      new PersonSearchCommand(this.bot),
      new HelpCommand(this.bot),
    ]

    for (const command of this.commands) {
      command.handle()
    }
  }

  private setTextActions() {
    this.textActions = [new UnknownAction(this.bot)]

    for (const action of this.textActions) {
      action.handler()
    }
  }
}

const bot = new Bot(new ConfigService())
bot.init()
