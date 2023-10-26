import { Getter, Setter } from "jotai";
import { Atomize, atomLoader, atomWithCallback } from "@/hooks/atomsX";
import { AppOptions } from "./types";
import { initialData } from "./store-initial-data";
import { saveStore } from "./store-save";
import { setColorList, _hueAtom, _monoAtom } from "../1-hue";
import { viewListAtoms, _colorListSortByAtom } from "../2-sorted-colors";

export const AppAtoms: Atomize<AppOptions> = {
    currentSectionAtom: atomWithCallback(initialData.appOptions.currentSection, saveStore),
};

export const dataLoadAtom = atomLoader((get: Getter, set: Setter) => {
    setColorList(get(_hueAtom), get(_monoAtom), set);
    set(viewListAtoms.sortByAtom, get(_colorListSortByAtom));
});
