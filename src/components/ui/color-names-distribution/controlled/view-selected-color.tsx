import { useSnapshot } from "valtio";
import { consts } from "./consts";
import { hueColorWheelState } from "./state";
import { HslName, hslToRgb, rgbLuminance } from "../original/utils-color";

function WheelWellCenter() {
    const { selectedColor, selectedGray } = useSnapshot(hueColorWheelState);
    const fill = (selectedColor || selectedGray)?.fill || 'none';
    return (
        <circle
            cx={consts.x}
            cy={consts.y}
            r={consts.innerRadius - (consts.swatchWidth / 5)}
            fill={fill}
        />
    );
}

function ColorText() {
    const { selectedColor } = useSnapshot(hueColorWheelState);
    if (!selectedColor) {
        return null;
    }
    const keys = selectedColor.dataKey.split(',') as HslName;
    const name = keys[3];
    const dark = rgbLuminance(hslToRgb(keys)) <= 0.6 ? true : false;
    const fill = dark ? 'fill-white' : 'fill-black';
    return (
        <text x={500} y={500}>
            <tspan textAnchor="middle" x={500} dy={-3} className={`font-bold text-2xl ${fill} stroke-black stroke-[.5]`}>{name}</tspan>
            <tspan textAnchor="middle" x={500} dy={25} className={`font-bold ${fill} stroke-black stroke-[.2]`}>{selectedColor.fill}</tspan>
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
        <text x={500} y={1125}>
            <tspan textAnchor="middle" x={500} dy={2}>{name}</tspan>
            <tspan textAnchor="middle" x={500} dy={23}>{selectedColor.fill}</tspan>
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
