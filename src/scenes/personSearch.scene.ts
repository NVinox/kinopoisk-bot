import { Markup, Scenes, Telegraf } from "telegraf";
import { ErrorHelper } from "../helpers/error.helper";
import { IBotContext } from "../interfaces/context.interface";
import { APIPerson } from "../API/person.api";
import { PersonService } from "../services/person.service";
import { WizardScene } from "../abstracts/wizardScene.class";
import { PaginationButtons } from "../buttons/callback/pagination.buttons";
import { PERSON_SEARCH_SCENE } from "../constants/scenes.constants";
import { ENTER_PERSON_TITLE } from "../constants/person.constants";
import { CancelKeyboard } from "../buttons/keyboard/cancel.keyboard";
import {
	PERSON_END_DATA,
	PERSON_NEXT_DATA,
	PERSON_PREV_DATA,
	PERSON_START_DATA,
} from "../constants/callbackData.constants";
import { PersonPaginationCallback } from "../callbacks/personPagination.callbacks";
import { CANCEL_TEXT, LEAVE_SCENE_TEXT } from "../constants/text.constants";
import { AsyncMessage } from "../helpers/asyncMessage.helper";
import { IPersonSearchResponse } from "../interfaces/person.interface";

export class PersonSearchScene extends WizardScene {
	constructor(public bot: Telegraf<IBotContext>) {
		super(bot);
	}

	getScene() {
		return new Scenes.WizardScene<IBotContext>(
			PERSON_SEARCH_SCENE,
			(ctx: IBotContext) => {
				this.start(ctx);
			},
			(ctx: IBotContext) => {
				this.sendPerson(ctx);
			}
		);
	}

	private async start(ctx: IBotContext) {
		try {
			await ctx.replyWithHTML(ENTER_PERSON_TITLE, CancelKeyboard.getKeyboard());
			return await ctx.wizard.next();
		} catch (error: unknown) {
			new ErrorHelper().sendInternalError(ctx, error);
		}
	}

	private async sendPerson(ctx: IBotContext) {
		try {
			if (ctx.text === CANCEL_TEXT) {
				await ctx.replyWithHTML(LEAVE_SCENE_TEXT, Markup.removeKeyboard());
				return await ctx.scene.leave();
			}

			const query = ctx.text!;
			const { docs, page, pages } =
				await AsyncMessage.sendWithProgress<IPersonSearchResponse>(
					() => APIPerson.search(query),
					ctx
				);
			const person = docs[0];
			const messageId = ctx.message?.message_id;
			const startCallbackData = `${PERSON_START_DATA}-${messageId}`;
			const prevCallbackData = `${PERSON_PREV_DATA}-${messageId}`;
			const nextCallbackData = `${PERSON_NEXT_DATA}-${messageId}`;
			const endCallbackData = `${PERSON_END_DATA}-${messageId}`;

			if (person) {
				const personService = new PersonService(person, page, pages);

				await ctx.replyWithPhoto(personService.getPhoto(), {
					caption: personService.getPhotoCaption(),
					parse_mode: "HTML",
					reply_markup: new PaginationButtons(
						startCallbackData,
						prevCallbackData,
						nextCallbackData,
						endCallbackData
					).getButtons(page, pages).reply_markup,
				});

				new PersonPaginationCallback(this.bot, {
					startCallbackData,
					prevCallbackData,
					nextCallbackData,
					endCallbackData,
					query,
					currentPage: page,
					totalPages: pages,
				}).init();
			} else {
				await ctx.replyWithHTML(
					`Личность '${query}' не найдена`,
					Markup.removeKeyboard()
				);
			}

			return await ctx.scene.leave();
		} catch (error: unknown) {
			new ErrorHelper().sendWizardSceneError(ctx, error);
		}
	}
}
