import { zoomView } from "./action-zoom";
import { sorter } from "./colors-sort";
import { uiElements } from "./dom-ui";
import { drawSpikes, generateColorWheel } from "./generate-svg";
import { colorkeys } from "./hsl-color-names";
import { shiftViewBox, svgCoords } from "./svg-utils";

function dragger(event: MouseEvent) {
    let targetPoint = svgCoords(event, target);
    anchorPoint && shiftViewBox(target, anchorPoint.x - targetPoint.x, anchorPoint.y - targetPoint.y);
}

function cancelDrag(e: MouseEvent) {
    target.classList.remove('dragging');
    window.removeEventListener("mousemove", dragger);
    window.removeEventListener("mouseup", cancelDrag);
    anchorPoint = undefined;
}

function dragView(event: MouseEvent) {
    anchorPoint = svgCoords(event, target);
    window.addEventListener("mousemove", dragger);
    window.addEventListener("mouseup", cancelDrag);
    target.classList.add('dragging');
}

var target: SVGSVGElement;
var anchorPoint: DOMPoint | undefined;

export function initModel() { //window.onload = function () {
    const resolution = 1;
    const outerRadius = 250;
    const innerRadius = 125;
    const swatchWidth = 25;
    var x = 500;
    var y = 500;
    target = uiElements.target;

    target.addEventListener("wheel", zoomView, false);
    target.addEventListener("mousedown", dragView, false);

    var well = uiElements.wheelWell;
    well.setAttribute('cx', `${x}`);
    well.setAttribute('cy', `${y}`);
    well.setAttribute('r', `${innerRadius - (swatchWidth / 5)}`);

    generateColorWheel(x, y, innerRadius, outerRadius, resolution, target);
    drawSpikes(x, y, colorkeys.sort(sorter), outerRadius, swatchWidth, target);

    const colorText = uiElements.colorText;
    target.removeChild(colorText);
    target.appendChild(colorText);
    const grayText = uiElements.grayText;
    target.removeChild(grayText);
    target.appendChild(grayText);
};

