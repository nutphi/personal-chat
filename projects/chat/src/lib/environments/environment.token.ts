import { InjectionToken } from "@angular/core";
import { Environment } from "./environment.model";

export const ENVIRONMENT: InjectionToken<Environment> = new InjectionToken('ENVIRONMENT');