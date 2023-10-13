import { useEffect, useRef, useState } from "react";
import { getSvgRootElement, svgCoords, shiftViewBox } from "../original/utils-svg";

export function useDrag() {
    const [svgRef, setSvgRef] = useState<SVGSVGElement | null>();
    const anchorPointRef = useRef<DOMPoint | undefined>();
    useEffect(() => {
        if (!svgRef) {
            return;
        }

        function dragger(event: MouseEvent) {
            const svg: SVGSVGElement | null = getSvgRootElement(event);
            if (!svg) {
                return;
            }
        
            let targetPoint = svgCoords(svg, event);
            anchorPointRef.current && shiftViewBox(svg, anchorPointRef.current.x - targetPoint.x, anchorPointRef.current.y - targetPoint.y);
        }
        
        function cancelDrag(event: MouseEvent) {
            const svg: SVGSVGElement | null = getSvgRootElement(event);
            if (!svg) {
                return;
            }
        
            svg.classList.remove('dragging');
        
            window.removeEventListener("mousemove", dragger);
            window.removeEventListener("mouseup", cancelDrag);
        
            anchorPointRef.current = undefined;
        }
        
        function dragView(event: MouseEvent) {
            const svg: SVGSVGElement | null = getSvgRootElement(event);
            if (!svg) {
                return;
            }
        
            anchorPointRef.current = svgCoords(svg, event);
        
            window.addEventListener("mousemove", dragger);
            window.addEventListener("mouseup", cancelDrag);
        
            svg.classList.add('dragging');
        }
        
        svgRef.addEventListener("mousedown", dragView, false);
        return () => {
            svgRef.removeEventListener('wheel', dragView);
        };
    }, [svgRef]);
    
    return setSvgRef;
}
