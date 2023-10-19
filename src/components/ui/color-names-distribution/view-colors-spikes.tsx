import { consts } from "./consts";
import { colorkeys } from "./utils/init-color-keys";
import { createSlicePath } from "./utils/utils-svg";
import { colorToCopyState, hueColorWheelState } from "./state";

function GenerateSpikeSlices() {
    var same = 0;
    const rv = colorkeys.map((color, idx) => {
        const hue = color[0];
        const sat = color[1];
        const lit = color[2];

        if (sat === 0) {
            return undefined;
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

                onClick={async () => {
                    if (color[3]) {
                        await navigator.clipboard.writeText(color[3]);
                        colorToCopyState.text = color[3];
                    }
                }}

                onMouseOverCapture={() => {
                    clearTimeout(hueColorWheelState.colorTimeoutId);
                    hueColorWheelState.selectedColor = {
                        type: 'color',
                        fill: `hsl(${hue},${sat}%,${lit}%)`,
                        dataKey: `${color}`,
                    };
                }}

                onMouseOutCapture={() => {
                    hueColorWheelState.colorTimeoutId = window.setTimeout(() => hueColorWheelState.selectedColor = null, 400);
                }}
            />
        );
    });
    return rv.filter(Boolean) as JSX.Element[];
}

export function ColorsWheelSpikes() {
    return (
        <g type="spikes">
            {GenerateSpikeSlices()}
        </g>
    );
}
