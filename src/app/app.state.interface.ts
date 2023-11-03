import { ChatState } from "./states/chat.state.interface";
import { ThemeState } from "./states/theme.state.interface";


export interface AppState {
    chat: ChatState,
    theme: ThemeState,
}
