import { dragView } from "./action-drag";
import { zoomView } from "./action-zoom";
import { uiElements } from "./ui-view-dom";
import { svgCreateColorViews } from "./init-generate-svg";
import { consts } from "./init-consts";

export function initModel() { //window.onload = function () {
    const svg = uiElements.target;
    svg.addEventListener("wheel", zoomView, false);
    svg.addEventListener("mousedown", dragView, false);

    var well = uiElements.wheelWell;
    well.setAttribute('cx', `${consts.x}`);
    well.setAttribute('cy', `${consts.y}`);
    well.setAttribute('r', `${consts.innerRadius - (consts.swatchWidth / 5)}`);

    svgCreateColorViews(svg);

    const colorText = uiElements.colorText;
    svg.removeChild(colorText);
    svg.appendChild(colorText);

    const grayText = uiElements.grayText;
    svg.removeChild(grayText);
    svg.appendChild(grayText);
};
