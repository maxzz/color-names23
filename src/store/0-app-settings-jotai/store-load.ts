import { STORAGE_KEY } from "./consts";
import { Store } from "./types";
import { initialData, setInitialData } from "./store-initial-data";

// Local storage

export function load() {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
        try {
            let obj = JSON.parse(s) as Store;
            setInitialData({ ...initialData, ...obj });
            //console.log('initialData', initialData);
        } catch (error) {
        }
    }
}

load();
