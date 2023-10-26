import { ColorsWheel } from "./view-colors";
import { ColorsWheelSpikes } from "./view-colors-spikes";
import { GrayBar } from "./view-grays";
import { useZoom } from "./action-zoom";
import { SVGAttributes } from "react";
import { useDrag } from "./action-drag";
import { SelectedColor } from "./view-selected-color";
import { clickState } from "./ui-state";

export * from "./ui-state";
export * from "./view-message-copied";

export function HuePicker({ className, ...rest }: SVGAttributes<SVGSVGElement>) {
    const setSvgZoomRef = useZoom();
    const setSvgDragRef = useDrag();
    return (
        <svg
            ref={(ref) => (setSvgZoomRef(ref), setSvgDragRef(ref))}
            viewBox="0 0 1000 1200"
            version="1.1"
            id="color-wheel"
            onClick={()=> clickState.colorName = ''}
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
