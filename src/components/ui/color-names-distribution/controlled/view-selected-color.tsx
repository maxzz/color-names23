import { useSnapshot } from "valtio";
import { consts } from "./consts";
import { hueColorWheelState } from "./state";
import { HslName, hslToRgb, rgbLuminance } from "../original/utils-color";

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
    const keys = selectedColor.dataKey.split(',') as HslName;
    const dark = rgbLuminance(hslToRgb(keys)) <= 0.6 ? true : false;
    const name = keys[3];
    return (
        <text x={500} y={500} id="colorText" className="readout">
            <tspan id="colorName" textAnchor="middle" x={500} dy={-3} className={`${dark ? 'fill-white':''}`}>{name}</tspan>
            <tspan id="colorHSL" textAnchor="middle" x={500} dy={25}>{selectedColor.fill}</tspan>
        </text>
    );
}

function GrayText() {
    const { selectedGray: selectedColor } = useSnapshot(hueColorWheelState);
    if (!selectedColor) {
        return null;
    }
    const keys = selectedColor.dataKey.split(',') as HslName;
    const name = keys[3];
    return (
        <text x={500} y={1125} id="grayText" className="readout">
            <tspan id="grayName" textAnchor="middle" x={500} dy={2}>{name}</tspan>
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
