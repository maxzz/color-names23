import { useEffect, useRef, useState } from "react";
import { svgCoords, shiftViewBox } from "../original/utils-svg";

export function useDrag() {
    const [svgRef, setSvgRef] = useState<SVGSVGElement | null>();
    const anchorPointRef = useRef<DOMPoint | undefined>();

    useEffect(() => {
        if (!svgRef) {
            return;
        }

        function dragger(event: MouseEvent) {
            if (!svgRef) {
                return;
            }
        
            let targetPoint = svgCoords(svgRef, event);
            anchorPointRef.current && shiftViewBox(svgRef, anchorPointRef.current.x - targetPoint.x, anchorPointRef.current.y - targetPoint.y);
        }
        
        function cancelDrag(event: MouseEvent) {
            if (!svgRef) {
                return;
            }
        
            svgRef.classList.remove('dragging');
        
            window.removeEventListener("mousemove", dragger);
            window.removeEventListener("mouseup", cancelDrag);
        
            anchorPointRef.current = undefined;
        }
        
        function dragView(event: MouseEvent) {
            if (!svgRef) {
                return;
            }
        
            anchorPointRef.current = svgCoords(svgRef, event);
        
            window.addEventListener("mousemove", dragger);
            window.addEventListener("mouseup", cancelDrag);
        
            svgRef.classList.add('dragging');
        }
        
        svgRef.addEventListener("mousedown", dragView, false);
        return () => {
            svgRef.removeEventListener('wheel', dragView);
        };
    }, [svgRef]);

    return setSvgRef;
}
