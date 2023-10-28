//https://meyerweb.com/eric/css/colors/hsl-dist.html 'CSS4 Color Keyword Distribution'

export type HslName = [h: number, s: number, l: number, name?: string];

function hsl2rgb(h: number, s: number, l: number) {
    // input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
    let a = s * Math.min(l, 1 - l);
    let f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return [f(0), f(8), f(4)];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 * https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion //G: 'hslToRgb'
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

    const n = hsl2rgb(h, s, l);
    return n as HslName;
}

export function rgbLuminance(c: HslName): number { //https://www.w3.org/TR/WCAG20/#relativeluminancedef
    return (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
}

export function contrastRatio(a: HslName, b: HslName): number { //https://www.w3.org/TR/WCAG20/#contrast-ratiodef
    let al = rgbLuminance(hslToRgb(a));
    let bl = rgbLuminance(hslToRgb(b));

    console.log('a =', a, 'b =', b, `al = ${al}.bl = ${bl} contrastRatio = ${(al + 0.05) / (bl + 0.05)}`);

    return (al + 0.05) / (bl + 0.05); //TODO: check if this is correct: purple color over black background has 1 contrast ratio instead of 21.5
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
