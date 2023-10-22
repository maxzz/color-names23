import { ShadcnPaletteTemplate, FileTwDoubleColor, TwDoubleColor } from "./types";

export function convertDefaultPaletteToArray(shadcnDefaultColor: ShadcnPaletteTemplate<FileTwDoubleColor>): TwDoubleColor[] {
    const colors = Object.entries(shadcnDefaultColor.colors)
        .map(([name, color]) => {
            if (typeof color === "string") {
                return {
                    name,
                    DEFAULT: color,
                };
            } else {
                return {
                    name,
                    DEFAULT: color.DEFAULT,
                    foreground: color.foreground,
                };
            }
        });
    return colors;
}
