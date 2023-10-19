import { Atomize, atomWithCallback } from "@/hooks/atomsX";
import { allColorsWoAlternatives, ColorItem, groupColors } from "@/utils-color";
import { atom, SetStateAction, Setter } from "jotai";
import { initialData } from "./store-initial-data";
import { saveStore } from "./store-save";
import { ViewHueOptions } from "./types";

export const _hueAtom = atomWithCallback(initialData.viewHueOptions.hue, saveStore);
export const _monoAtom = atomWithCallback(initialData.viewHueOptions.mono, saveStore);

export const viewHueAtoms: Atomize<ViewHueOptions & {
    colorGroups: ColorItem[][];
    tolerance: number;
}> = {
    colorAtom: atomWithCallback(initialData.viewHueOptions.color, saveStore),
    hueAtom: atom(
        (get) => get(_hueAtom),
        (get, set, hue: SetStateAction<number>) => {
            const v = typeof hue === 'function' ? hue(get(_hueAtom)) : hue;
            setColorList(v, get(_monoAtom), set);
            set(_hueAtom, v);
        }
    ),
    monoAtom: atom(
        (get) => get(_monoAtom),
        (get, set, mono: SetStateAction<boolean>) => {
            const v = typeof mono === 'function' ? mono(get(_monoAtom)) : mono;
            setColorList(get(_hueAtom), v, set);
            set(_monoAtom, v);
        }
    ),
    lockedAtom: atomWithCallback(initialData.viewHueOptions.locked, saveStore),
    linearAtom: atomWithCallback(initialData.viewHueOptions.linear, saveStore),
    colorGroupsAtom: atom<ColorItem[][]>([]),
    toleranceAtom: atom(0),
};

export function setColorList(hue: number, mono: boolean, set: Setter) {
    const groups = groupColors({ colorList: allColorsWoAlternatives, hue, startTolerance: 5, mono, });
    set(viewHueAtoms.colorGroupsAtom, groups.list);
    set(viewHueAtoms.toleranceAtom, groups.tolerance);
    set(viewHueAtoms.colorAtom, groups?.list?.[0]?.[0] || null);
}
