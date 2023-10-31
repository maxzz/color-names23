export type FileThemeVars = Record<string, Record<string, string>>; // name inside theme (like :root or .dark) -> {cssVarName: cssVarValue}

export type ThemeVarsParsed = {               // as paste operation result
    name: string;
    values: Record<string, string>;     // cssVarName w/ '--', cssVarValue
};

export type ThemeVar = {                // CSS var NameValue
    themeName: string;                  // theme name that this color belongs to
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
    name: string;                       // theme name inside theme (like :root or .dark)
    vars: ThemeVarFB[];                 // cssVarName, cssVarValue
};

// Color counters

export type GroupColorCounter = Record<string, number>; // color -> count

export type GroupColorCounters = {
    counters: GroupColorCounter;
};

export type AllColorCounters = {
    groups: Record<string, GroupColorCounters>; // group name -> ThemeCounters
}
