export type FileThemeVars = Record<string, Record<string, string>>; // name inside theme (like :root or .dark) -> {cssVarName: cssVarValue}

export type CssVarNameValue = {
    name: string,               // name wo/ '--' and wo/ '-foreground' suffix
    fore?: boolean;             // true if name has '-foreground' suffix
    value: string;
    order: number;              // order in css file
    id: number;                 // id in memory only for react key
};

export type OneThemeVars = {
    name: string;               // name inside theme (like :root or .dark)
    vars: CssVarNameValue[];    // cssVarName, cssVarValue
};
