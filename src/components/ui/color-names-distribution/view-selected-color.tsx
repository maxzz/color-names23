import { useSnapshot } from "valtio";
import { consts } from "./consts";
import { hueColorWheelState } from "./ui-state";
import { HslName, isHslDark } from "@/utils";

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
    const fill = isHslDark(keys) ? 'fill-white' : 'fill-black';
    return (
        <text x={500} y={500}>
            <tspan textAnchor="middle" x={500} dy={-3} className={`font-bold text-2xl tracking-tight ${fill} stroke-black stroke-[.5] select-none`}>{name}</tspan>
            <tspan textAnchor="middle" x={500} dy={25} className={`font-bold ${fill} stroke-black stroke-[.2] select-none`}>{selectedColor.fill}</tspan>
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
            <tspan textAnchor="middle" x={500} dy={2} className={`font-bold text-3xl tracking-tighter fill-black stroke-neutral-100/30 stroke-[.3] select-none`}>{name}</tspan>
            <tspan textAnchor="middle" x={500} dy={23} className={`font-bold text-xl fill-black stroke-neutral-100/30 stroke-[.1] select-none`}>{selectedColor.fill}</tspan>
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
