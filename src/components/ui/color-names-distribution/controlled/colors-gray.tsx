import { colorkeys } from "../original/init-color-keys";

function GenerateSlices() {
    const barWidth = 600;
    const barHeight = 66;
    const barTop = 1100;
    const barEdge = (1000 - barWidth) / 2;
    const grayWidth = barWidth / 101;
    const grayHeight = 30;

    var same = 0;
    const rv = colorkeys.map((color, idx) => {
        const hue = color[0];
        const sat = color[1];
        const lit = color[2];

        const light = color[2];
        if (idx > 0 && colorkeys[idx - 1][2] !== light) {
            same = 0;
        }

        if (sat !== 0) {
            return null;
        }

        if (idx > 0 && colorkeys[idx - 1][0] != hue) {
            same = 0;
        }

        return (
            <rect
                x={`${barEdge + (grayWidth * light)}`}
                y={`${barTop - grayHeight - (same++ * grayHeight)}`}
                height={`${grayHeight - 1.25}`}
                width={`${grayWidth}`}
                fill={`hsl(0,0%,${light}%)`}

                data-key={`${color}`}
                type='gray'
                key={idx}
            />
        );
    });
    return rv;
}

/*
        if ((color as any) == 0) {
            gray.setAttribute("height", `${grayHeight - 2}`);
            gray.setAttribute("stroke", '#666');
            gray.setAttribute("stroke-width", '0.5');
        }
    }

*/

export function GrayBar() {
    const barWidth = 600;
    const barHeight = 66;
    const barTop = 1100;
    const barEdge = (1000 - barWidth) / 2;
    const grayWidth = barWidth / 101;
    const grayHeight = 30;

    return (
        <g type="gray-bar">
            <rect
                x={barEdge}
                y={barTop}
                height={barHeight}
                width={barWidth}
                fill='url(#graydient)'
                stroke='#666'
                strokeWidth='0.2'
            />

            <GenerateSlices />
        </g>
    );
}
