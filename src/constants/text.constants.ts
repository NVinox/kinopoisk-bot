import {
  MOVIE_SEARCH_COMMAND,
  PERSON_SEARCH_COMMAND,
} from "./commands.constants";
import { CANCEL_ICON } from "./emoji.constants";

export const UNKNOWN_COMMAND_TEXT =
  "Такой команды не существует.\nПосмотрите список доступных команд.";

export const CANCEL_TEXT = `Отмена ${CANCEL_ICON}`;

export const LEAVE_SCENE_TEXT = "Вы вышли из режима ввода";

export const PROGRESS_DATA_TEXT = "Запрашиваю данные...";

export const HELP_COMMAND_TEXT = `Для того, чтобы воспользоваться ботом выберите одну из команд:\n\n<a>/${MOVIE_SEARCH_COMMAND}</a> - поиск фильма по названию\n\n<a>/${PERSON_SEARCH_COMMAND}</a> - поиск перосны по названию`;
