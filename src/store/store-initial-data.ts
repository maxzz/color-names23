import { ColorItem, SortBy } from "@/utils-color";

export enum SectionName {
    hue,
    list,
    tailwind,
    shadcn,
}

export type AppOptions = {
    currentSection: SectionName;
};

export type ViewHueOptions = {
    color: ColorItem | null;
    hue: number;
    mono: boolean; // monochrome vs. color
};

export type ViewListOptions = {
    sortBy: SortBy;
};

export type Store = {
    appOptions: AppOptions;
    viewHueOptions: ViewHueOptions;
    viewListOptions: ViewListOptions;
};

export let initialData: Store = {
    appOptions: {
        currentSection: SectionName.hue,
    },
    viewHueOptions: {
        color: null,
        hue: 298,
        mono: false,
    },
    viewListOptions: {
        sortBy: SortBy.hsl,
    },
};

export function setInitialData(data: Store) {
    initialData = data;
}