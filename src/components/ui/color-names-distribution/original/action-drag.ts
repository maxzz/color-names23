import { uiElements } from "./view-dom-ui";
import { shiftViewBox, svgCoords } from "./utils-svg";

var anchorPoint: DOMPoint | undefined;

function dragger(event: MouseEvent) {
    let targetPoint = svgCoords(event, uiElements.target);
    anchorPoint && shiftViewBox(uiElements.target, anchorPoint.x - targetPoint.x, anchorPoint.y - targetPoint.y);
}

function cancelDrag(e: MouseEvent) {
    uiElements.target.classList.remove('dragging');
    window.removeEventListener("mousemove", dragger);
    window.removeEventListener("mouseup", cancelDrag);
    anchorPoint = undefined;
}

export function dragView(event: MouseEvent) {
    anchorPoint = svgCoords(event, uiElements.target);
    window.addEventListener("mousemove", dragger);
    window.addEventListener("mouseup", cancelDrag);
    uiElements.target.classList.add('dragging');
}
