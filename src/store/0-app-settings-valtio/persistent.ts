import { proxy, subscribe } from "valtio";
import { STORE_KEY } from "./consts";
import { Theme, themeApply } from "@/utils/theme-apply";

export type AppSettings = {
    theme: Theme;
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

themeApply(appSettings.theme);

subscribe(appSettings, () => {
    themeApply(appSettings.theme);
    localStorage.setItem(STORE_KEY, JSON.stringify(appSettings));
});
