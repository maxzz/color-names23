import { dragView } from "./action-drag";
import { zoomView } from "./action-zoom";
import { sorter } from "./utils-color";
import { uiElements } from "./ui-view-dom";
import { drawSpikes, generateColorWheel } from "./generate-svg";
import { colorkeys } from "./const-hsl-color-names";
import { consts } from "./init-consts";

export function initModel() { //window.onload = function () {
   
    const target = uiElements.target;
    target.addEventListener("wheel", zoomView, false);
    target.addEventListener("mousedown", dragView, false);

    var well = uiElements.wheelWell;
    well.setAttribute('cx', `${consts.x}`);
    well.setAttribute('cy', `${consts.y}`);
    well.setAttribute('r', `${consts.innerRadius - (consts.swatchWidth / 5)}`);

    generateColorWheel(consts.x, consts.y, consts.innerRadius, consts.outerRadius, consts.resolution, target);
    drawSpikes(consts.x, consts.y, colorkeys.sort(sorter), consts.outerRadius, consts.swatchWidth, target);

    const colorText = uiElements.colorText;
    target.removeChild(colorText);
    target.appendChild(colorText);

    const grayText = uiElements.grayText;
    target.removeChild(grayText);
    target.appendChild(grayText);
};
