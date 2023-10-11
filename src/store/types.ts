import { ColorItem, SortBy } from "@/utils-color";

export * from "@/utils-color";

export enum SectionName {
    hue,
    list,
    tailwind,
    shadcn,
    hueWheel,
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
