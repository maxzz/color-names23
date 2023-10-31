export type FileThemeVars = Record<string, Record<string, string>>; // name inside theme (like :root or .dark) -> {cssVarName: cssVarValue}

export type ThemeVars = {               // as paste operation result
    name: string;
    values: Record<string, string>;     // cssVarName w/ '--', cssVarValue
};

export type ThemeVar = {                // CSS var NameValue
    name: string,                       // name wo/ '--' and wo/ '-foreground' suffix
    fore?: boolean;                     // true if name has '-foreground' suffix
    value: string;                      // hsl params, or it can be length value, or rgb parts, hex color3, or hex color6s
    order: number;                      // order in css file
    id: number;                         // id in memory only for react key
    isHsl?: boolean;                    // true if value is hsl() i.e. '222.2 47.4% 11.2%'
    themeName: string;                  // theme name that this color belongs to
};

export type ThemeVarFB = {              // CSS var NameValue pair with foreground and background
    f?: ThemeVar;                       // foreground
    b?: ThemeVar;                       // background
};

export type OneTheme = {
    name: string;                       // theme name inside theme (like :root or .dark)
    vars: ThemeVarFB[];                 // cssVarName, cssVarValue
};

//

export type GroupColorCounter = Record<string, number>; // color -> count

export type GroupColorCounters = {
    counters: GroupColorCounter;
};

export type AllColorCounters = {
    groups: Record<string, GroupColorCounters>; // group name -> ThemeCounters
}
