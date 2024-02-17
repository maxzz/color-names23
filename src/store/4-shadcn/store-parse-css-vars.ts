import { proxy, subscribe } from "valtio";
import { parseCSSVarsToShadcnGroups, parseTextToCSSVars } from "./css-vars";
import { shadcnAll } from "./store-all";

export const parseText = proxy({
    text: '',
});

subscribe(parseText, () => {
    const vars = parseTextToCSSVars(parseText.text);
    const themes = parseCSSVarsToShadcnGroups(vars);
    console.log('themes', themes);
    shadcnAll.themes.splice(0, Infinity, ...themes); // copy themes to store
});
