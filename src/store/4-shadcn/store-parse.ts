import { proxy, subscribe } from "valtio";
import { parseTextAsCSSvars, testToParseCss, testToParseCss2, testToParseJs } from "./parse";
import { shadcnPalette } from "./store-palette";
import { convertFileThemeVarsToPairs } from "./convert-vars-to-valtio";

export const parseText = proxy({
    text: '',
});

subscribe(parseText, () => {
    const vars = parseTextAsCSSvars(parseText.text);
    const pairs = convertFileThemeVarsToPairs(vars);
    console.log('vars', vars);
    console.log('pairs', pairs);
    shadcnPalette.varGroups = pairs;
});

// const vars = parseTextAsCSSvars(testToParseCss2);
// console.log('vars', vars);
