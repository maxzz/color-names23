import { ColorsWheel } from "./view-colors";
import { ColorsWheelSpikes } from "./view-colors-spikes";
import { GrayBar } from "./view-grays";
import { useZoom } from "./action-zoom";
import { SVGAttributes } from "react";
import { classNames } from "@/utils";
import { useDrag } from "./action-drag";
import { SelectedColor } from "./view-selected-color";

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

            <GrayBar />

            <SelectedColor />
        </svg>
    );
}
