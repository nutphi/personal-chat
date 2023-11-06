import { createSelector } from "@ngrx/store";
import { AppState } from "../../states/app.state.interface";

export const getChat = (state: AppState) => state.chat;

export const getMessages = createSelector(getChat, state => state.messages);
