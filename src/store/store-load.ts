import { initialData, setInitialData } from "./store-initial-data";
import { Store } from "./types";

// Local storage

export const STORAGE_KEY = 'react-name-colors22-01';

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
