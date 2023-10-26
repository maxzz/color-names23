//https://meyerweb.com/eric/css/colors/hsl-dist.html 'CSS4 Color Keyword Distribution'

export type HslName = [h: number, s: number, l: number, name?: string];

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 * Lightly adapted from https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 *
 * @param   {number}  h       The hue       : [0..360]
 * @param   {number}  s       The saturation: [0..100]
 * @param   {number}  l       The lightness : [0..100]
 * @return  {Array}           The RGB representation: [r, g, b] : [0..1]
 */
export function hslToRgb(hslColor: HslName): HslName {
    let h = hslColor[0] % 360;
    let s = hslColor[1] / 100;
    let l = hslColor[2] / 100;

    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r, g, b];

    function hue2rgb(p: number, q: number, t: number) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
}

export function rgbLuminance(c: HslName): number {
    return (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
}

export function sorterByLuminance(a: HslName, b: HslName): number {
    let al = rgbLuminance(hslToRgb(a));
    let bl = rgbLuminance(hslToRgb(b));
    return ((a[0] - b[0]) || (b[2] - a[2]) || (al + bl));
}

export function isHslDark(c: HslName): boolean {
    return rgbLuminance(hslToRgb(c)) <= 0.6; // see also https://github.com/Qix-/color/blob/master/index.js#L298
}

export function isRgbDark(c: HslName): boolean {
    return rgbLuminance(c) <= 0.6; // see also https://github.com/Qix-/color/blob/master/index.js#L298
}

/**
 * isLightOrDark
 * @param color : string;
 * @returns true - light; false - dark
 * 
 * https://awik.io/determine-color-bright-dark-using-javascript
 */
export function isRgbColorLight(color: string) {
    let r: number, g: number, b: number;

    if (color.match(/^rgb/)) {
        // rgb(a)
        const clr = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        if (!clr) {
            return true;
        }
        r = +clr[1];
        g = +clr[2];
        b = +clr[3];
    } else {
        // hex - http://gist.github.com/983661
        const clr = +('0x' + color.slice(1).replace((color.length < 5) as any && /./g, '$&$&')); // double numbers of short hand 3 or 4 digits form
        r = clr >> 16;
        g = clr >> 8 & 255;
        b = clr & 255;
    }

    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)); //http://alienryderflex.com/hsp.html
    return hsp > 127.5;
}
