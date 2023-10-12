import { uiElements } from "./ui-view-dom";
import { shiftViewBox, svgCoords } from "./utils-svg";

var anchorPoint: DOMPoint | undefined;

function dragger(event: MouseEvent) {
    let targetPoint = svgCoords(uiElements.target, event);
    anchorPoint && shiftViewBox(uiElements.target, anchorPoint.x - targetPoint.x, anchorPoint.y - targetPoint.y);
}

function cancelDrag(e: MouseEvent) {
    uiElements.target.classList.remove('dragging');
    window.removeEventListener("mousemove", dragger);
    window.removeEventListener("mouseup", cancelDrag);
    anchorPoint = undefined;
}

export function dragView(event: MouseEvent) {
    anchorPoint = svgCoords(uiElements.target, event);
    window.addEventListener("mousemove", dragger);
    window.addEventListener("mouseup", cancelDrag);
    uiElements.target.classList.add('dragging');
}
