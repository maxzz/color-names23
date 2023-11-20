import { consts } from "./consts";
import { colorkeys } from "./utils/initial-color-keys";
import { createSlicePath } from "./utils/utils-svg";
import { clickState, colorToCopyState, hueColorWheelState, hueCopyTimersState } from "./ui-state";
import { colorOverBackground } from "@/store";

function GenerateSpikeSlices() {
    let same = 0;
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
                style={{ cursor: 'pointer' }}

                onClick={async (event) => {
                    const colorName = color[3];
                    if (colorName) {
                        event.stopPropagation();
                        const combined = color.join(',');

                        if (event.ctrlKey) {
                            clickState.colorName = combined;
                            colorOverBackground.bkgClk = combined;
                        } else {
                            await navigator.clipboard.writeText(colorName);
                            colorToCopyState.text = colorName;
                            colorOverBackground.colorClk = combined;
                        }
                    }
                }}

                onMouseOverCapture={() => {
                    clearTimeout(hueCopyTimersState.colorTimeoutId);
                    hueColorWheelState.selectedColor = {
                        type: 'color',
                        fill: `hsl(${hue},${sat}%,${lit}%)`,
                        dataKey: `${color}`,
                    };
                }}

                onMouseOutCapture={() => {
                    hueCopyTimersState.colorTimeoutId = window.setTimeout(() => hueColorWheelState.selectedColor = null, 400);
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
