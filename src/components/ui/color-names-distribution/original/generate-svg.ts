import { clearColor, showColor } from "./color-actions";
import { HslName } from "./utils-color";

function createSlicePath(x: number, y: number, innerRadius: number, outerRadius: number, hue: number, step: number): string {
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

    function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): { x: number; y: number; } {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0; // Adapted from http://jsbin.com/quhujowota/1/edit?js,output

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
        };
    }

    function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number): string {
        const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
        const curve = endAngle - startAngle < 0 ? '0' : '1';

        const arc = [
            'A', radius, radius, 0, arcSweep, curve
        ].join(' ');

        return arc;
    }
}

export function generateColorWheel(x: number, y: number, innerRadius: number, outerRadius: number, resolution: number, target: SVGSVGElement): void {

    for (var i = 0; i < 360 * resolution; i++) {
        const hue = i / resolution;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        path.setAttribute("d", createSlicePath(x, y, innerRadius, outerRadius, hue, 2.5));
        path.setAttribute('fill', 'hsl(' + hue + ', 100%, 50%)');
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
        path.setAttribute('fill', 'hsl(' + hue + ',' + sat + '%,' + lit + '%)');
        path.setAttribute('data-key', `${color}`);
        path.setAttribute("type", "color");

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

export function drawSpikes(x: number, y: number, colors: HslName[], outerRadius: number, width: number, target: SVGSVGElement): void {
    // const limit = colors.length;
    // var same = 0;
    // var grays = [];

    // for (var i = 0; i < limit; i++) {
    //     const color = colors[i];
    //     const hue = color[0];
    //     const sat = color[1];
    //     const lit = color[2];

    //     if (sat == 0) {
    //         grays.push(color);
    //         continue;
    //     }

    //     if (i > 0 && colors[i - 1][0] != hue) {
    //         same = 0;
    //     }
    //     const inner = outerRadius + (width * same + 0.5);
    //     const outer = outerRadius + (width * (same + 1));


    //     const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    //     path.setAttribute("d", createSlicePath(x, y, inner, outer, hue, same));
    //     path.setAttribute('fill', 'hsl(' + hue + ',' + sat + '%,' + lit + '%)');
    //     path.setAttribute('data-key', `${color}`);
    //     path.setAttribute("type", "color");

    //     path.addEventListener('mouseover', showColor, true);
    //     path.addEventListener('mouseout', clearColor, true);

    //     target.appendChild(path);
    //     same++;
    // }

    const { grays } = drawColors(x, y, colors, outerRadius, width, target);

    drawGrays(grays, target);
}
