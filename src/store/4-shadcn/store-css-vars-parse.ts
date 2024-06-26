import { proxy, subscribe } from "valtio";
import { parseCSSVarsToShadcnGroups, parseTextToCSSVars, parseToGroups } from "./css-vars";
import { shadcnAll } from "./store-all";

export const parseText = proxy({
    text: '',
});

subscribe(parseText, () => {
    const vars = parseTextToCSSVars(parseText.text);
    const themes = parseCSSVarsToShadcnGroups(vars);

    const test = parseToGroups(vars);
    console.log('TEST GROUPS', JSON.stringify(test, null, 4));
    
    shadcnAll.themes.splice(0, Infinity, ...themes); // copy themes to store

    console.log('themes', themes);
});
