import { colorkeys } from "./utils/initial-color-keys";
import { clickState, colorToCopyState, hueColorWheelState, hueCopyTimersState } from "./ui-state";

const localConsts = {
    barWidth: 600,
    barHeight: 66,
    barTop: 1100,
    barEdge: (1000 - 600) / 2,  // (1000 - barWidth) / 2
    grayWidth: 600 / 101,       // barWidth / 101
    grayHeight: 30,
};

function GenerateSlices() {
    let same = 0;
    const rv = colorkeys.map((color, idx) => {
        const sat = color[1];
        const light = color[2];

        if (sat !== 0) {
            return null;
        }

        if (idx > 0 && colorkeys[idx - 1][2] !== light) {
            same = 0;
        }

        const pos = {
            x: localConsts.barEdge + (localConsts.grayWidth * light),
            y: localConsts.barTop - localConsts.grayHeight - (same++ * localConsts.grayHeight),
            width: localConsts.grayWidth,
            height: localConsts.grayHeight - 1.25,
        };

        return (
            <rect
                {...pos}
                fill={`hsl(0,0%,${light}%)`}

                data-key={`${color}`}
                type='gray'
                key={idx}
                style={{ cursor: 'pointer', transformOrigin: `${pos.x + pos.width / 2}px ${pos.y + pos.height / 2}px` }}
                className="active:scale-x-[5] active:scale-y-150 transition-transform stroke-foreground/40 stroke-0.5 active:stroke-[.1]"

                onClick={async (event) => {
                    const colorName = color[3];
                    if (colorName) {
                        event.stopPropagation();
                        if (event.ctrlKey) {
                            clickState.colorName = color.join(',');
                        } else {
                            await navigator.clipboard.writeText(colorName);
                            colorToCopyState.text = colorName;
                        }
                    }
                }}

                onMouseOverCapture={(e) => {
                    clearTimeout(hueCopyTimersState.grayTimeoutId);
                    hueColorWheelState.selectedGray = {
                        type: 'gray',
                        fill: `hsl(0,0%,${light}%)`,
                        dataKey: `${color}`,
                    };
                }}
                onMouseOutCapture={(e) => {
                    hueCopyTimersState.grayTimeoutId = window.setTimeout(() => hueColorWheelState.selectedGray = null, 400);
                }}

            />
        );
    });
    return rv;
}

export function GrayBar() {
    return (
        <g type="gray-bar">
            <rect
                x={localConsts.barEdge}
                y={localConsts.barTop}
                height={localConsts.barHeight}
                width={localConsts.barWidth}
                fill='url(#graydient)'
                stroke='#666'
                strokeWidth='0.2'
            />

            {GenerateSlices()}
        </g>
    );
}
