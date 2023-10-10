import { ShadcnPaletteTemplate, FileDoubleColor, DoubleColor } from "./types";

export function convertDefaultColorsToArray(shadcnDefaultColor: ShadcnPaletteTemplate<FileDoubleColor>): DoubleColor[] {
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
