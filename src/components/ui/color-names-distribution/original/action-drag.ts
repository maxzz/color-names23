import { getSvgRootElement, shiftViewBox, svgCoords } from "./utils-svg";

var anchorPoint: DOMPoint | undefined;

function dragger(event: MouseEvent) {
    const svg: SVGSVGElement | null = getSvgRootElement(event);
    if (!svg) {
        return;
    }

    let targetPoint = svgCoords(svg, event);
    anchorPoint && shiftViewBox(svg, anchorPoint.x - targetPoint.x, anchorPoint.y - targetPoint.y);
}

function cancelDrag(event: MouseEvent) {
    const svg: SVGSVGElement | null = getSvgRootElement(event);
    if (!svg) {
        return;
    }

    svg.classList.remove('dragging');

    window.removeEventListener("mousemove", dragger);
    window.removeEventListener("mouseup", cancelDrag);

    anchorPoint = undefined;
}

export function dragView(event: MouseEvent) {
    const svg: SVGSVGElement | null = getSvgRootElement(event);
    if (!svg) {
        return;
    }

    anchorPoint = svgCoords(svg, event);

    window.addEventListener("mousemove", dragger);
    window.addEventListener("mouseup", cancelDrag);

    svg.classList.add('dragging');
}
