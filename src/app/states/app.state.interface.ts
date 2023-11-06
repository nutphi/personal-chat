import { ChatState } from "./chat.state.interface";
import { StorageState } from "./storage.state.interface";
import { ThemeState } from "./theme.state.interface";

export interface AppState {
    chat: ChatState,
    theme: ThemeState,
    storage: StorageState
}
