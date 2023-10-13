import { consts } from "./consts";

function WheelWellCenter() {
    return (
        <circle
            cx={consts.x}
            cy={consts.y}
            r={consts.innerRadius - (consts.swatchWidth / 5)}
            fill="none"
            // temp
            className="fill-blue-300"
            id="wheel-well"
        />
    );
}

function ColorText() {
    return (
        <text x={500} y={500} id="colorText" className="readout">
            <tspan id="colorName" textAnchor="middle" x={500} dy={-3} />
            <tspan id="colorHSL" textAnchor="middle" x={500} dy={25} />
        </text>
    );
}

function GrayText() {
    return (
        <text x={500} y={1125} id="grayText" className="readout">
            <tspan id="grayName" textAnchor="middle" x={500} dy={2} />
            <tspan id="grayHSL" textAnchor="middle" x={500} dy={23} />
        </text>
    );
}


export function SelectedColor() {
    return (
        <g>
            <WheelWellCenter />
            <ColorText />
            <GrayText />
        </g>
    );
}
