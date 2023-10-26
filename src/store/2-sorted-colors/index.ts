import { atom, SetStateAction } from "jotai";
import { Atomize, atomWithCallback } from "@/hooks/atomsX";
import { ViewListOptions } from "../0-app-settings-jotai/types";
import { allColorsWoAlternatives, ColorItem, SortBy, sortColorItemsFn } from "@/utils-color";
import { initialData } from "../0-app-settings-jotai/store-initial-data";
import { saveStore } from "../0-app-settings-jotai/store-save";

export const _colorListSortByAtom = atomWithCallback(initialData.viewListOptions.sortBy, saveStore);

export const viewListAtoms: Atomize<ViewListOptions & { colorList: ColorItem[]; }> = {
    sortByAtom: atom(
        (get) => get(_colorListSortByAtom),
        (get, set, value: SetStateAction<SortBy>) => {
            const v = typeof value === 'function' ? value(get(_colorListSortByAtom)) : value;
            const fn = sortColorItemsFn(v);
            const list = fn ? [...allColorsWoAlternatives].sort(fn) : allColorsWoAlternatives;
            set(viewListAtoms.colorListAtom, list);
            set(_colorListSortByAtom, v);
        }
    ),
    colorListAtom: atom<ColorItem[]>([]),
};
