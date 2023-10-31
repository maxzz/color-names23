export type FileThemeVars = Record<string, Record<string, string>>; // name inside theme (like :root or .dark) -> {cssVarName: cssVarValue}

export type ThemeVars = {               // as paste operation result
    name: string;
    values: Record<string, string>;     // cssVarName w/ '--', cssVarValue
};

export type CssVarNameValue = {
    name: string,                       // name wo/ '--' and wo/ '-foreground' suffix
    fore?: boolean;                     // true if name has '-foreground' suffix
    value: string;
    order: number;                      // order in css file
    id: number;                         // id in memory only for react key
    isHsl?: boolean;                    // true if value is hsl() i.e. '222.2 47.4% 11.2%'
};

export type ForeAndBack = {
    f?: CssVarNameValue;                // foreground
    b?: CssVarNameValue;                // background
};

export type OneThemeVars = {
    name: string;                       // name inside theme (like :root or .dark)
    vars: ForeAndBack[];                // cssVarName, cssVarValue
};

//

export type ThemeCounters = {   // color -> count
    counters: Record<string, number>;
};

export type ColorCounters = {
    groups: Record<string, ThemeCounters>; // group name -> ThemeCounters
}
