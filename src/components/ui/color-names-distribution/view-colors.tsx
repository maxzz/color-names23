import { consts } from "./consts";
import { createSlicePath } from "./utils/utils-svg";

function generateCircleSlices(x: number, y: number, innerRadius: number, outerRadius: number, resolution: number) {
    const rv = [];
    for (var i = 0; i < 360 * resolution; i++) {
        const hue = i / resolution;
        const path = <path
            d={createSlicePath(x, y, innerRadius, outerRadius, hue, 2.5)}
            fill={`hsl(${hue}, 100%, 50%)`}
            data-key={`${hue}`}
            key={i}
        />;
        rv.push(path);
    }
    return rv;
}

export function ColorsWheel() {
    return (
        <g type="wheel">
            {generateCircleSlices(consts.x, consts.y, consts.innerRadius, consts.outerRadius, 1)}
        </g>
    );
}
