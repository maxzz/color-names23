export type CSSVarNameValue = Record<string, string>; // cssVarName -> cssVarValue
export type FileThemeVars = Record<string, CSSVarNameValue>; // name inside theme (like :root or .dark) -> {cssVarName: cssVarValue}

export type ThemeVarsParsed = {         // as paste operation result
    name: string;
    values: Record<string, string>;     // cssVarName w/ '--', cssVarValue
};

export type ThemeVarName = {
    varName: string,                    // name wo/ '--' and wo/ '-foreground' suffix
    isFore?: boolean;                   // true if name has '-foreground' suffix
    isBorder?: boolean;                 // true if name has '-border' suffix
    unkSuffix?: string;                 // unknown suffix of name (like 'name-something')
};

export type ThemeVar = Prettify<
    & {                                 // CSS var NameValue
        themeId: number;                // theme unique ID that this color belongs to
        varValue: string;               // hsl params, or it can be length value, or rgb parts, hex color3, or hex color6
        isHsl?: boolean;                // true if value is hsl() i.e. '222.2 47.4% 11.2%'
        order: number;                  // order in css file
        id: number;                     // id in memory only for react key
    }
    & ThemeVarName>;

export type ThemeVarFBR = {             // CSS var NameValue pair with foreground and background
    f?: ThemeVar;                       // foreground
    b?: ThemeVar;                       // background
    r?: ThemeVar;                       // border
    s?: Record<string, ThemeVar>;       // unknown suffixs
};

export type ThemeVars = {
    themeId: number;                    // unique id in memory only for counters
    name: string;                       // theme name inside theme (like :root or .dark)
    vars: ThemeVarFBR[];                // cssVarName, cssVarValue
};

// Color counters

export type GroupColorCounters = Record<string, number>; // CSS var color value -> count

export type AllThemeCounters = {
    themeRoot: Record<number, GroupColorCounters>; // themeId -> ThemeCounters
};
