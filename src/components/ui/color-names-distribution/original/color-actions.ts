import { HslName, hslToRgb, rgbLuminance } from "./utils-color";
import { uiElements } from "./view-dom-ui";

var mousedelay: number;

export function showColor(evt: MouseEvent) {
    window.clearTimeout(mousedelay);

    const obj = evt.target as SVGGraphicsElement;
    if(!obj) {
        return;
    }

    const ctype = obj.getAttribute('type') as "color" | "gray";
    const colorText = uiElements[(ctype + 'Text') as 'colorText' | 'grayText']; //document.getElementById(ctype + 'Text')
    const colorName = uiElements[(ctype + 'Name') as 'colorName' | 'grayName']; //document.getElementById(ctype + 'Name');
    const colorHSL = uiElements[(ctype + 'HSL') as 'colorHSL' | 'grayHSL'];     //document.getElementById(ctype + 'HSL');

    const fillvalue = obj.getAttribute('fill')!;
    const keys = obj.getAttribute('data-key')!.split(',') as unknown as HslName;

    const dark = rgbLuminance(hslToRgb(keys)) <= 0.6 ? true : false;

    if (ctype == "color") {
        uiElements.wheelWell.setAttribute('fill', fillvalue);
    }

    if (dark && ctype == "color") {
        colorText.classList.add('dark');
    }
    else {
        colorText.classList.remove('dark');
    };

    colorName.innerHTML = keys[3] || '';
    colorHSL.innerHTML = fillvalue;

}

export function clearColor(evt: MouseEvent) {
    mousedelay = window.setTimeout(function () {
        const obj = evt.target as HTMLElement;
        if (!obj) {
            return;
        }
        const ctype = obj.getAttribute('type');
        const colorText = uiElements[(ctype + 'Text') as 'colorText' | 'grayText']; //document.getElementById(ctype + 'Text')
        const colorName = uiElements[(ctype + 'Name') as 'colorName' | 'grayName']; //document.getElementById(ctype + 'Name');
        const colorHSL = uiElements[(ctype + 'HSL') as 'colorHSL' | 'grayHSL'];     //document.getElementById(ctype + 'HSL');
    
        colorText.classList.remove('dark');
        colorName.innerHTML = "";
        colorHSL.innerHTML = "";
        uiElements.wheelWell.setAttribute('fill', 'none');
    }, 117, false);
}
