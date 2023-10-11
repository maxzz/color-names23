//https://meyerweb.com/eric/css/colors/hsl-dist.html 'CSS4 Color Keyword Distribution'

export type ColorKeys3 = [h: number, s: number, l: number, name?: string];

// Lightly adapted from https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
export function hslToRgb(hslColor: ColorKeys3): ColorKeys3 {

    var h = hslColor[0] / 360;
    var s = hslColor[1] / 100;
    var l = hslColor[2] / 100;

    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p: number, q: number, t: number) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r, g, b];
}

export function rgbLuminance(c: ColorKeys3): number {
    return (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
}

export function sorter(a: ColorKeys3, b: ColorKeys3): number {
    var al = rgbLuminance(hslToRgb(a));
    var bl = rgbLuminance(hslToRgb(b));
    return ((a[0] - b[0]) || (b[2] - a[2]) || (al + bl));
}
