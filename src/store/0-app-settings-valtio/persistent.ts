import { proxy, subscribe } from "valtio";
import { STORE_KEY } from "./consts";
import { ThemeMode, themeApplyMode } from "@/utils/theme-apply";

export type AppSettings = {
    theme: ThemeMode;
};

const defaultSettings: AppSettings = {
    theme: 'light',
};

export const appSettings = proxy<AppSettings>(initSettings());

function initSettings(): AppSettings {
    const savedSettings = localStorage.getItem(STORE_KEY);
    if (savedSettings) {
        try {
            return JSON.parse(savedSettings);
        } catch (error) {
        }
    }
    return defaultSettings;
}

themeApplyMode(appSettings.theme);

subscribe(appSettings, () => {
    themeApplyMode(appSettings.theme);
    localStorage.setItem(STORE_KEY, JSON.stringify(appSettings));
});
