import { consts } from "./consts";
import { createSlicePath } from "../original/utils-svg";

function generateColorWheel(x: number, y: number, innerRadius: number, outerRadius: number, resolution: number) {
    const piece = [];
    for (var i = 0; i < 360 * resolution; i++) {
        const hue = i / resolution;
        const path = <path d={createSlicePath(x, y, innerRadius, outerRadius, hue, 2.5)} fill={`hsl(${hue}, 100%, 50%)`} data-key={`${hue}`} key={i} />;
        piece.push(path);
    }
    return piece;
}

export function WheelColors() {
    return (
        <g>
            {generateColorWheel(consts.x, consts.y, consts.innerRadius, consts.outerRadius, 1)}
        </g>
    );
}
