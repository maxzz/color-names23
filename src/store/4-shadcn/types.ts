export type ShadcnPaletteTemplate<T> = {
    colors: {
        border: T;        // SingleColor
        input: T;         // SingleColor
        ring: T;          // SingleColor
        background: T;    // SingleColor
        foreground: T;    // SingleColor
        primary: T;
        secondary: T;
        destructive: T;
        muted: T;
        accent: T;
        popover: T;
        card: T;
    },
    borderRadius: {
        lg: string;
        md: string;
        sm: string;
    },
};

export type FileDoubleColor =
    | {
        DEFAULT: string;
        foreground?: string;
    }
    | string;

export type DoubleColor = {
    name: string; // js key name
    DEFAULT: string;
    foreground?: string;
};

export type FileThemeVars = Record<string, Record<string, string>>; // name inside theme (like :root or .dark) -> {cssVarName: cssVarValue}

export type CSSVarValue = [name: string, value: string];

export type OneThemeVars = {
    name: string;               // name inside theme (like :root or .dark)
    vars: CSSVarValue[];        // cssVarName, cssVarValue
}

export type ShadcnPalette = {
    paletteName: string;
    colors: DoubleColor[];
    vars: OneThemeVars;
};
