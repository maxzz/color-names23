import { ShadcnBaseVarNames, FileTwColorWDefault, TwColorWDefault } from "../types";

export function fileTwColorDefaultToArray(shadcnDefaultColor: ShadcnBaseVarNames<FileTwColorWDefault>): TwColorWDefault[] {
    const colors = Object
        .entries(shadcnDefaultColor.colors)
        .map(
            ([name, color]) => {
                if (typeof color === "string") {
                    return {
                        name,
                        DEFAULT: color,
                    };
                }
                
                return {
                    name,
                    DEFAULT: color.DEFAULT,
                    foreground: color.foreground,
                };
            }
        );
    return colors;
}
