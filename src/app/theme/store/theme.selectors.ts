import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./../../app.state.interface";
import { ThemeState } from "src/app/states/theme.state.interface";

export const getThemeState = createFeatureSelector<ThemeState>('theme');

export const getMode = createSelector(getThemeState, state => state.mode);
