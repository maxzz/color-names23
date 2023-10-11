//https://meyerweb.com/eric/css/colors/hsl-dist.html 'CSS4 Color Keyword Distribution'

type ColorKeys3 = [h: number, s: number, l: number, name?: string];

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
function hslToRgb(hslColor: ColorKeys3): ColorKeys3 {

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

function rgbLuminance(c: ColorKeys3): number {
    return (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
}

function sorter(a: ColorKeys3, b: ColorKeys3) {
    var al = rgbLuminance(hslToRgb(a));
    var bl = rgbLuminance(hslToRgb(b));
    return ((a[0] - b[0]) || (b[2] - a[2]) || (al + bl));
}


// Adapted from http://jsbin.com/quhujowota/1/edit?js,output

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}


function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    const curve = endAngle - startAngle < 0 ? '0' : '1';

    const arc = [
        'A', radius, radius, 0, arcSweep, curve
    ].join(' ');

    return arc;
}

function createSlicePath(x: number, y: number, innerRadius: number, outerRadius: number, hue: number, step: number) {
    const innerArcStart = hue - 0.5 - (0.1 * (step - 1));
    const innerArcEnd = hue + 0.5 + (0.1 * (step - 1));
    const outerArcStart = hue - 0.5 - (0.1 * step);
    const outerArcEnd = hue + 0.5 + (0.1 * step);


    const innerStart = polarToCartesian(x, y, innerRadius, innerArcEnd);
    const innerEnd = polarToCartesian(x, y, innerRadius, innerArcStart);
    const outerStart = polarToCartesian(x, y, outerRadius, outerArcStart);
    const outerEnd = polarToCartesian(x, y, outerRadius, outerArcEnd);

    const slicePath = [
        "M",
        outerStart.x, outerStart.y,
        describeArc(x, y, outerRadius, outerArcStart, outerArcEnd),
        outerEnd.x, outerEnd.y,
        "L",
        innerStart.x, innerStart.y,
        describeArc(x, y, innerRadius, innerArcEnd, innerArcStart),
        innerEnd.x, innerEnd.y,
        "z"
    ].join(' ');

    return slicePath;
}


function generateColorWheel(x: number, y: number, innerRadius: number, outerRadius: number, resolution: number, target: SVGSVGElement) {

    for (var i = 0; i < 360 * resolution; i++) {
        const hue = i / resolution;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        path.setAttribute(
            "d",
            createSlicePath(x, y, innerRadius, outerRadius, hue, 2.5)
        );
        path.setAttribute('fill', 'hsl(' + hue + ', 100%, 50%)');
        path.setAttribute('data-key', `${hue}`);

        target.appendChild(path);
    }
}

function drawSpikes(x: number, y: number, colors: ColorKeys3[], outerRadius: number, width: number, target: SVGSVGElement) {
    const limit = colors.length;
    var same = 0;
    var grays = [];

    for (var i = 0; i < limit; i++) {
        const color = colors[i];
        const hue = color[0];
        const sat = color[1];
        const lit = color[2];

        if (sat == 0) {
            grays.push(color);
            continue;
        }

        if (i > 0 && colors[i - 1][0] != hue) {
            same = 0;
        }
        const inner = outerRadius + (width * same + 0.5);
        const outer = outerRadius + (width * (same + 1));


        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute("d", createSlicePath(x, y, inner, outer, hue, same));
        path.setAttribute('fill', 'hsl(' + hue + ',' + sat + '%,' + lit + '%)');
        path.setAttribute('data-key', `${color}`);
        path.setAttribute("type", "color");

        path.addEventListener('mouseover', showColor, true);
        path.addEventListener('mouseout', clearColor, true);

        target.appendChild(path);
        same++;
    }
    drawGrays(grays, target);
}

function drawGrays(colors: ColorKeys3[], target: SVGSVGElement) {
    const barwidth = 600;
    const barheight = 66;
    const bartop = 1100;
    const baredge = (1000 - barwidth) / 2;
    const graywidth = barwidth / 101;
    const grayheight = 30;

    let graydient = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    graydient.setAttribute("x", `${baredge}`);
    graydient.setAttribute("y", `${bartop}`);
    graydient.setAttribute("height", `${barheight}`);
    graydient.setAttribute("width", `${barwidth}`);
    graydient.setAttribute("fill", "url(#graydient)");
    graydient.setAttribute("stroke", "#666");
    graydient.setAttribute("stroke-width", "0.2");

    target.appendChild(graydient);

    var same = 0;
    for (var i = 0; i < colors.length; i++) {
        const color = colors[i];
        const light = color[2];
        if (i > 0 && colors[i - 1][2] != light) {
            same = 0;
        }

        let gray = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        gray.setAttribute("x", `${baredge + (graywidth * light)}`);
        gray.setAttribute("y", `${bartop - grayheight - (same * grayheight)}`);
        gray.setAttribute("height", `${grayheight - 1.25}`);
        gray.setAttribute("width", `${graywidth}`);
        gray.setAttribute("fill", "hsl(0,0%," + light + "%)");
        if ((color as any) == 0) {
            gray.setAttribute("height", `${grayheight - 2}`);
            gray.setAttribute("stroke", "#666");
            gray.setAttribute("stroke-width", "0.5");
        }
        gray.setAttribute('data-key', `${color}`); // color is '0,0,66,darkgrey'
        gray.setAttribute("type", "gray");

        gray.addEventListener('mouseover', showColor, true);
        gray.addEventListener('mouseout', clearColor, true);

        target.appendChild(gray);
        same++;
    }
}

var mousedelay: number;

function showColor(evt: MouseEvent) {
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
    const keys = obj.getAttribute('data-key')!.split(',') as unknown as ColorKeys3;

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

function clearColor(evt: MouseEvent) {
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


function parseViewBox(elem: SVGSVGElement) {
    return {
        x: elem.viewBox.baseVal.x,
        y: elem.viewBox.baseVal.y,
        w: elem.viewBox.baseVal.width,
        h: elem.viewBox.baseVal.height,
    };
}

function changeViewBox(elem: SVGSVGElement, coords: { x: number, y: number, w: number, h: number; }) {
    elem.viewBox.baseVal.x = coords.x;
    elem.viewBox.baseVal.y = coords.y;
    elem.viewBox.baseVal.width = coords.w;
    elem.viewBox.baseVal.height = coords.h;
}

function zoomView(event: WheelEvent) {

    var wheelView = uiElements.target;
    var rect = wheelView.getBoundingClientRect();
    var dims = parseViewBox(wheelView);

    var zoomdir = event.deltaY < 0 ? -1 : 1;
    var scale = 1 + (zoomdir * 0.1);
    if (
        ((dims.w <= 333 || dims.h <= 400) && zoomdir < 0) ||
        ((dims.w > 1000 || dims.h > 1200) && zoomdir > 0)
    ) {
        //		console.log('limited');	
        return;
    }

    var mpx = 0, mpy = 0, mpxpct = 0, mpypct = 0;
    mpx = event.clientX - rect.x;
    mpy = event.clientY - rect.y;
    mpxpct = mpx / rect.width;
    mpypct = mpy / rect.height;

    var svgcoord = svgCoords(event, wheelView);

    var newwidth = dims.w * scale;
    var newheight = dims.h * scale;

    var coords = { x: 0, y: 0, w: 0, h: 0 };

    coords.x = Math.round(svgcoord.x - (newwidth * mpxpct));
    coords.y = Math.round(svgcoord.y - (newheight * mpypct));
    coords.w = Math.round(newwidth);
    coords.h = Math.round(newheight);

    if (coords.w > 1000) coords.w = 1000;
    if (coords.h > 1200) coords.h = 1200;
    if (coords.x < 0) coords.x = 0;
    if (coords.y < 0) coords.y = 0;
    if (coords.x + coords.w > 1000) coords.x = 1000 - coords.w;
    if (coords.y + coords.h > 1200) coords.y = 1200 - coords.h;

    changeViewBox(wheelView, coords);
    event.preventDefault();
    event.returnValue = false;

}

function svgCoords(event: MouseEvent, elem: SVGSVGElement) {
    var ctm = elem.getScreenCTM()!;
    var pt = elem.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    return pt.matrixTransform(ctm.inverse());
}

/* 
Most of the following functions adapted (or straight copied) from Amelia Bellamy-Royd’s answer on
https://stackoverflow.com/questions/55564432/how-do-i-translate-mouse-movement-distances-to-svg-coordinate-space
(but also check out niaccurshi’s answer; it’s very good too!)
*/

function shiftViewBox(deltaX: number, deltaY: number) {
    target.viewBox.baseVal.x += deltaX;
    target.viewBox.baseVal.y += deltaY;
}

function dragger(event: MouseEvent) {
    var targetPoint = svgCoords(event, target);
    anchorPoint && shiftViewBox(anchorPoint.x - targetPoint.x, anchorPoint.y - targetPoint.y);
}

function cancelDrag(e: MouseEvent) {
    target.classList.remove('dragging');
    window.removeEventListener("mousemove", dragger);
    window.removeEventListener("mouseup", cancelDrag);
    anchorPoint = undefined;
}

var target: SVGSVGElement;
var anchorPoint: DOMPoint | undefined;

export function initModel() { //window.onload = function () {
    const resolution = 1;
    const outerRadius = 250;
    const innerRadius = 125;
    const swatchWidth = 25;
    var x = 500;
    var y = 500;
    target = uiElements.target;

    target.addEventListener("wheel", zoomView, false);
    target.addEventListener("mousedown", function (event) {
        anchorPoint = svgCoords(event, target);
        window.addEventListener("mousemove", dragger);
        window.addEventListener("mouseup", cancelDrag);
        target.classList.add('dragging');
    }, false);

    var well = uiElements.wheelWell;
    well.setAttribute('cx', `${x}`);
    well.setAttribute('cy', `${y}`);
    well.setAttribute('r', `${innerRadius - (swatchWidth / 5)}`);

    generateColorWheel(x, y, innerRadius, outerRadius, resolution, target);
    drawSpikes(x, y, colorkeys.sort(sorter), outerRadius, swatchWidth, target);

    const colorText = uiElements.colorText;
    target.removeChild(colorText);
    target.appendChild(colorText);
    const grayText = uiElements.grayText;
    target.removeChild(grayText);
    target.appendChild(grayText);
};

let colorkeys: ColorKeys3[] = [];

const uiElements: {
    target: SVGSVGElement;
    wheelWell: SVGCircleElement;

    colorText: SVGTextElement;
    colorName: SVGTSpanElement;
    colorHSL: SVGTSpanElement;

    grayText: SVGTextElement;
    grayName: SVGTSpanElement;
    grayHSL: SVGTSpanElement;
} = {
    target: document.getElementById('color-wheel')! as unknown as SVGSVGElement,
    wheelWell: document.getElementById('wheel-well')! as unknown as SVGCircleElement,

    colorText: document.getElementById('colorText')! as unknown as SVGTextElement,
    colorName: document.getElementById('colorName')! as unknown as SVGTSpanElement,
    colorHSL: document.getElementById('colorHSL')! as unknown as SVGTSpanElement,

    grayText: document.getElementById('grayText')! as unknown as SVGTextElement,
    grayName: document.getElementById('grayName')! as unknown as SVGTSpanElement,
    grayHSL: document.getElementById('grayHSL')! as unknown as SVGTSpanElement,
};
