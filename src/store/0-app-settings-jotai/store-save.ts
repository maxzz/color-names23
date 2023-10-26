import { Getter } from "jotai";
import { STORAGE_KEY } from "./consts";
import { Store } from "./types";
import { AppAtoms } from ".";
import { viewHueAtoms, _hueAtom, _monoAtom } from "../1-hue";
import { viewListAtoms } from "../2-sorted-colors";
import { debounce } from "@/utils";

const saveDebounced = debounce(
    function _save(get: Getter) {
        let newStore: Store = {
            appOptions: {
                currentSection: get(AppAtoms.currentSectionAtom),
            },
            viewHueOptions: {
                color: get(viewHueAtoms.colorAtom),
                hue: get(_hueAtom),
                mono: get(_monoAtom),
                locked: get(viewHueAtoms.lockedAtom),
                linear: get(viewHueAtoms.linearAtom),
            },
            viewListOptions: {
                sortBy: get(viewListAtoms.sortByAtom),
            },
        };
        //console.log('save', newStore);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newStore));
    }, 1000
);

export function saveStore({ get }: { get: Getter; }) {
    return saveDebounced(get);
}
