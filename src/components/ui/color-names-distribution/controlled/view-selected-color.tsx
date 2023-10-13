import { useSnapshot } from "valtio";
import { consts } from "./consts";
import { hueColorWheelState } from "./state";

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
    const { selectedColor } = useSnapshot(hueColorWheelState);
    if (!selectedColor) {
        return null;
    }
    return (
        <text x={500} y={500} id="colorText" className="readout">
            <tspan id="colorName" textAnchor="middle" x={500} dy={-3}>{selectedColor.dataKey}</tspan>
            <tspan id="colorHSL" textAnchor="middle" x={500} dy={25}>{selectedColor.fill}</tspan>
        </text>
    );
}

function GrayText() {
    const { selectedGray: selectedColor } = useSnapshot(hueColorWheelState);
    if (!selectedColor) {
        return null;
    }
    return (
        <text x={500} y={1125} id="grayText" className="readout">
            <tspan id="grayName" textAnchor="middle" x={500} dy={2}>{selectedColor.dataKey}</tspan>
            <tspan id="grayHSL" textAnchor="middle" x={500} dy={23}>{selectedColor.fill}</tspan>
        </text>
    );
}

export function SelectedColor() {
    return (
        <g type="selected-color">
            <WheelWellCenter />
            <ColorText />
            <GrayText />
        </g>
    );
}
