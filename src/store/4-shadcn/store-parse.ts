import { proxy, subscribe } from "valtio";
import { parseTextAsCSSvars, testToParseCss, testToParseCss2, testToParseJs } from "./parse";

export const parseText = proxy({
    text: '',
});

subscribe(parseText, () => {
    const vars = parseTextAsCSSvars(parseText.text);
    console.log('vars', vars);
});

// const vars = parseTextAsCSSvars(testToParseCss2);
// console.log('vars', vars);
