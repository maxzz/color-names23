import { dragView } from "./action-drag";
import { zoomView } from "./action-zoom";
import { sorter } from "./utils-color";
import { uiElements } from "./view-dom-ui";
import { drawSpikes, generateColorWheel } from "./generate-svg";
import { colorkeys } from "./const-hsl-color-names";

export function initModel() { //window.onload = function () {
    const resolution = 1;
    const outerRadius = 250;
    const innerRadius = 125;
    const swatchWidth = 25;
    const x = 500;
    const y = 500;
    const target = uiElements.target;

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
