import { SectionName, SortBy, Store } from "./types";

export let initialData: Store = {
    appOptions: {
        currentSection: SectionName.hue,
    },
    viewHueOptions: {
        color: null,
        hue: 298,
        mono: false,
        locked: true,
        wheel: true,
    },
    viewListOptions: {
        sortBy: SortBy.hsl,
    },
};

export function setInitialData(data: Store) {
    initialData = data;
}
