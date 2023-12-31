export type CSSVarNameValue = Record<string, string>; // cssVarName -> cssVarValue
export type FileThemeVars = Record<string, CSSVarNameValue>; // name inside theme (like :root or .dark) -> {cssVarName: cssVarValue}

export type ThemeVarsParsed = {         // as paste operation result
    name: string;
    values: Record<string, string>;     // cssVarName w/ '--', cssVarValue
};

export type ThemeVar = {                // CSS var NameValue
    themeId: number;                    // theme unique ID that this color belongs to
    varName: string,                    // name wo/ '--' and wo/ '-foreground' suffix
    varValue: string;                   // hsl params, or it can be length value, or rgb parts, hex color3, or hex color6
    isFore?: boolean;                   // true if name has '-foreground' suffix
    isHsl?: boolean;                    // true if value is hsl() i.e. '222.2 47.4% 11.2%'
    order: number;                      // order in css file
    id: number;                         // id in memory only for react key
};

export type ThemeVarFB = {              // CSS var NameValue pair with foreground and background
    f?: ThemeVar;                       // foreground
    b?: ThemeVar;                       // background
};

export type ThemeVars = {
    themeId: number;                    // unique id in memory only for counters
    name: string;                       // theme name inside theme (like :root or .dark)
    vars: ThemeVarFB[];                 // cssVarName, cssVarValue
};

// Color counters

export type GroupColorCounters = Record<string, number>; // CSS var color value -> count

export type AllThemeCounters = {
    themeRoot: Record<number, GroupColorCounters>; // themeId -> ThemeCounters
}
