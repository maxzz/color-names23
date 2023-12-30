export type ColorPickerPalette = {
    title: string;					// Palette name
    colors: string[];				// palette color names
    shades: Map<string, string[]>;	// shades of the palette color
    shadeNames: string[];			// names of the shades: 50-900, A100-A700 (by the length of longest palette)
    defShadeIdx: number;			// index of the default shade '500'
    extraIdx: number;				// index of the extra shade 'A100'
};
