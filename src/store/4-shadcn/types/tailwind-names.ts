export type ShadcnTailwindClassNamesTemplate<T> = {
    colors: {
        border: T;              // SingleColor
        input: T;               // SingleColor
        ring: T;                // SingleColor
        background: T;          // SingleColor
        foreground: T;          // SingleColor
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

export type TailwindColorWDefaultInFile =
    | {
        DEFAULT: string;
        foreground?: string;
    }
    | string;

export type TailwindColorWDefault = {
    name: string;               // js key name
    DEFAULT: string;
    foreground?: string;
};
