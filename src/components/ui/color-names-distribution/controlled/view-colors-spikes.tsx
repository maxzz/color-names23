import { consts } from "./consts";
import { colorkeys } from "../original/init-color-keys";
import { createSlicePath } from "../original/utils-svg";
import { hueColorWheelState } from "./state";

function GenerateSpikeSlices() {
    var same = 0;
    const rv = colorkeys.map((color, idx) => {
        const hue = color[0];
        const sat = color[1];
        const lit = color[2];

        if (sat === 0) {
            return null;
        }

        if (idx > 0 && colorkeys[idx - 1][0] !== hue) {
            same = 0;
        }

        const inner = consts.outerRadius + (consts.swatchWidth * same + 0.5);
        const outer = consts.outerRadius + (consts.swatchWidth * (same + 1));

        return (
            <path
                d={createSlicePath(consts.x, consts.y, inner, outer, hue, same++)}
                fill={`hsl(${hue},${sat}%,${lit}%)`}
                data-key={`${color}`}
                type='color'
                key={idx}
                onMouseOverCapture={(e) => {
                    clearTimeout(hueColorWheelState.colorTimeoutId);
                    hueColorWheelState.selectedColor = {
                        type: 'color',
                        fill: `hsl(${hue},${sat}%,${lit}%)`,
                        dataKey: `${color}`,
                    };
                }}
                onMouseOutCapture={(e) => {
                    hueColorWheelState.colorTimeoutId = window.setTimeout(() => {
                        hueColorWheelState.selectedColor = null;
                    }, 300);
                }}
            />
        );
    });
    return rv;
}

export function ColorsWheelSpikes() {
    return (
        <g type="spikes">
            <GenerateSpikeSlices />
        </g>
    );
}
