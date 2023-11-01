import { proxy, subscribe } from "valtio";
import { parseTextAsCSSvars, testToParseCss, testToParseCss2, testToParseJs } from "./css-vars/parse";
import { shadcnAll } from "./store-all";
import { convertFileThemeVarsToPairs } from "./css-vars/convert-vars-to-valtio";
import { updateColorCounters } from "./store-counters";

export const parseText = proxy({
    text: '',
});

subscribe(parseText, () => {
    const vars = parseTextAsCSSvars(parseText.text);
    const themes = convertFileThemeVarsToPairs(vars);
    console.log('vars', vars);
    console.log('themes', themes);
    shadcnAll.themes = themes;
    updateColorCounters(); // because themes is array, not object, so we need to update counters manually.
});

// const vars = parseTextAsCSSvars(testToParseCss2);
// console.log('vars', vars);
