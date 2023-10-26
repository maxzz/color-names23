/**
 * isLightOrDark
 * @param color : string;
 * @returns true - light; false - dark
 * 
 * https://awik.io/determine-color-bright-dark-using-javascript
 */
export function isLightColor(color: string) {
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
