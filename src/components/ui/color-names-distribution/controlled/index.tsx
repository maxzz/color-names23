import { consts } from "./consts";
import { ColorsWheel } from "./colors-wheel";
import { ColorsWheelSpikes } from "./colors-wheel-spikes";
import { GrayBar } from "./colors-gray";
import { useZoom } from "./action-zoom";
import { SVGAttributes } from "react";
import { classNames } from "@/utils";
import { useDrag } from "./action-drag";

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

export function ColorNamesWheel({className, ...rest}: SVGAttributes<SVGSVGElement>) {
    const setSvgZoomRef = useZoom();
    const setSvgDragRef = useDrag();
    return (
        <svg
            ref={(ref) => (setSvgZoomRef(ref), setSvgDragRef(ref))}
            viewBox="0 0 1000 1200"
            version="1.1"
            id="color-wheel"
            className={classNames("bg-blue-300/20", className)}
            {...rest}
        >
            <defs>
                <linearGradient id="graydient">
                    <stop offset="1%" stopColor="#000" />
                    <stop offset="99%" stopColor="#FFF" />
                </linearGradient>
            </defs>

            <ColorsWheel />
            <ColorsWheelSpikes />
            <WheelWellCenter />

            <GrayBar />

            <ColorText />
            <GrayText />
        </svg>
    );
}
