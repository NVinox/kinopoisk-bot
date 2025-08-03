import { BotCommand } from "telegraf/typings/core/types/typegram";
import { ICommands } from "../../interfaces/commands.interface";
import {
  HELP_COMMAND,
  MOVIE_SEARCH_COMMAND,
  PERSON_SEARCH_COMMAND,
  HELP_DESCRIPTION,
  MOVIE_SEARCH_DESCRIPTION,
  PERSON_SEARCH_DESCRIPTION,
} from "../../constants/commands.constants";

export class CommandsButtons implements ICommands {
  get(): readonly BotCommand[] {
    return [
      {
        command: MOVIE_SEARCH_COMMAND,
        description: MOVIE_SEARCH_DESCRIPTION,
      },
      {
        command: PERSON_SEARCH_COMMAND,
        description: PERSON_SEARCH_DESCRIPTION,
      },
      {
        command: HELP_COMMAND,
        description: HELP_DESCRIPTION,
      },
    ];
  }
}
