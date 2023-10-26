import { ColorGroups } from "@/components/ui/tailwind-colors-bridge";
import { atom } from "jotai";

//#region Tailwind

/*1*/
export type CurrentTwColor = {
    group: string;  // group: stale, ..
    key: string;    // 50, 100, ..
    value: string;  // hex color value
}

export const currentTwColorAtom = atom<CurrentTwColor | null>(null);
/**/

/*3* /
export type CurrentTwGrIdx = {
    key: string;    // 50, 100, ..
    value: string;  // hex color value
};

export type CurrentTwColor =
    & {
        group: string;  // group: stale, ..
    }
    & CurrentTwGrIdx;

export const currentTwColorAtom = atom<CurrentTwColor | null>(null);

export const setTwGrIdxAtom = atom(
    null,
    (get, set, value: CurrentTwGrIdx) => {
        const twColor = get(currentTwColorAtom);
        if (twColor) {
            set(currentTwColorAtom, { group: twColor.group, ...value });
        }
    }
);

/**/

/*2* /
export type CurrentTwGrIdx = {
    key: string;    // 50, 100, ..
    value: string;  // hex color value
};

export type CurrentTwColor = {
    group: string;  // group: stale, ..
} & CurrentTwGrIdx;

export const currentTwGroupAtom = atom<string | null>(null);
export const currentTwGrIdxAtom = atom<CurrentTwGrIdx | null>(null);

export const currentTwColorAtom = atom(
    (get) => {
        const group = get(currentTwGroupAtom);
        const grIdx = get(currentTwGrIdxAtom);
        return group && grIdx ? { group, ...grIdx } : null;
    },
    (get, set, value: SetStateAction<CurrentTwColor | null>) => {
        const v = typeof value === 'function'? value(get(currentTwColorAtom)) : value;
        if (!v) {
            set(currentTwGroupAtom, null);
            set(currentTwGrIdxAtom, null);
        } else {
            set(currentTwGroupAtom, v.group);
            set(currentTwGrIdxAtom, { key: v.key, value: v.value });
        }
    }
);
/**/

export const allColorsAtom = atom<ColorGroups>({});

export const colorNameCntAtom = atom( // number of colors in group [50, 100, ..., 950]
    (get) => {
        const colors = get(allColorsAtom);
        const [_, groupValues] = Object.entries(colors)[0] || [];
        return Object.keys(groupValues || {}).length;
    }
);

//#endregion Tailwind

