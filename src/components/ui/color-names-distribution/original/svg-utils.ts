export function svgCoords(event: MouseEvent, svg: SVGSVGElement) {
    /* 
    Most of the following functions adapted (or straight copied) from Amelia Bellamy-Royd’s answer on
    https://stackoverflow.com/questions/55564432/how-do-i-translate-mouse-movement-distances-to-svg-coordinate-space
    (but also check out niaccurshi’s answer; it’s very good too!)
    */
    let ctm = svg.getScreenCTM()!;
    let pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    return pt.matrixTransform(ctm.inverse());
}

export function shiftViewBox(target: SVGSVGElement, deltaX: number, deltaY: number) {
    target.viewBox.baseVal.x += deltaX;
    target.viewBox.baseVal.y += deltaY;
}
