import { clearColor, showColor } from "./action-current-color";
import { colorkeys } from "./init-color-keys";
import { consts } from "./init-consts";
import { HslName, sorter } from "./utils-color";
import { createSlicePath } from "./utils-svg";

function generateColorWheel(x: number, y: number, innerRadius: number, outerRadius: number, resolution: number, target: SVGSVGElement): void {

    for (var i = 0; i < 360 * resolution; i++) {
        const hue = i / resolution;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        path.setAttribute("d", createSlicePath(x, y, innerRadius, outerRadius, hue, 2.5));
        path.setAttribute('fill', `hsl(${hue}, 100%, 50%)`);
        path.setAttribute('data-key', `${hue}`);

        target.appendChild(path);
    }
}

function drawColors(x: number, y: number, colors: HslName[], outerRadius: number, width: number, target: SVGSVGElement) {
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
        path.setAttribute('fill', `hsl(${hue},${sat}%,${lit}%)`);
        path.setAttribute('data-key', `${color}`);
        path.setAttribute("type", 'color');

        path.addEventListener('mouseover', showColor, true);
        path.addEventListener('mouseout', clearColor, true);

        target.appendChild(path);
        same++;
    }
    return {
        grays,
    };
}

function drawGrays(colors: HslName[], target: SVGSVGElement) {
    const barWidth = 600;
    const barHeight = 66;
    const barTop = 1100;
    const barEdge = (1000 - barWidth) / 2;
    const grayWidth = barWidth / 101;
    const grayHeight = 30;

    let graydient = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    graydient.setAttribute("x", `${barEdge}`);
    graydient.setAttribute("y", `${barTop}`);
    graydient.setAttribute("height", `${barHeight}`);
    graydient.setAttribute("width", `${barWidth}`);
    graydient.setAttribute("fill", 'url(#graydient)');
    graydient.setAttribute("stroke", '#666');
    graydient.setAttribute("stroke-width", '0.2');
    target.appendChild(graydient);

    var same = 0;
    for (var i = 0; i < colors.length; i++) {
        const color = colors[i];
        const light = color[2];
        if (i > 0 && colors[i - 1][2] != light) {
            same = 0;
        }

        let gray = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        gray.setAttribute("x", `${barEdge + (grayWidth * light)}`);
        gray.setAttribute("y", `${barTop - grayHeight - (same * grayHeight)}`);
        gray.setAttribute("height", `${grayHeight - 1.25}`);
        gray.setAttribute("width", `${grayWidth}`);
        gray.setAttribute("fill", `hsl(0,0%,${light}%)`);
        if ((color as any) == 0) { // i guess this is checking for undefined color. This is why a wierd color set.
            gray.setAttribute("height", `${grayHeight - 2}`);
            gray.setAttribute("stroke", '#666');
            gray.setAttribute("stroke-width", '0.5');
        }
        gray.setAttribute('data-key', `${color}`); // color is '0,0,66,darkgrey'
        gray.setAttribute("type", 'gray');

        gray.addEventListener('mouseover', showColor, true);
        gray.addEventListener('mouseout', clearColor, true);

        target.appendChild(gray);
        same++;
    }
}

function drawSpikes(x: number, y: number, colors: HslName[], outerRadius: number, width: number, target: SVGSVGElement): void {
    const { grays } = drawColors(x, y, colors, outerRadius, width, target);
    drawGrays(grays, target);
}

export function svgCreateColorViews(svg: SVGSVGElement): void {
    generateColorWheel(consts.x, consts.y, consts.innerRadius, consts.outerRadius, consts.resolution, svg);
    drawSpikes(consts.x, consts.y, colorkeys.sort(sorter), consts.outerRadius, consts.swatchWidth, svg);
}
