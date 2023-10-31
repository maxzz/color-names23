import { ShadcnTailwindClassNamesTemplate, TailwindColorWDefaultInFile, TailwindColorWDefault } from "../types";

export function convertDefaultPaletteToArray(shadcnDefaultColor: ShadcnTailwindClassNamesTemplate<TailwindColorWDefaultInFile>): TailwindColorWDefault[] {
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
