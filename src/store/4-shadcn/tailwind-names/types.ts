export type FileTwColorWDefault =
    | {
        DEFAULT: string;
        foreground?: string;
    }
    | string;

export type TwColorWDefault = {
    name: string;               // js key name
    DEFAULT: string;
    foreground?: string;
};

export type ShadcnBaseVarNames<T> = {
    colors: {
        background: T;          // SingleColor
        foreground: T;          // SingleColor
        primary: T;
        secondary: T;
        destructive: T;
        muted: T;
        accent: T;
        popover: T;
        card: T;
        input: T;               // SingleColor
        border: T;              // SingleColor
        ring: T;                // SingleColor
    },
    borderRadius: {
        lg: string;
        md: string;
        sm: string;
    },
};
