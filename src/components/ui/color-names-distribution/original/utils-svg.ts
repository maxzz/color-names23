export function svgCoords(svg: SVGSVGElement, event: MouseEvent) {
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

export function createSlicePath(x: number, y: number, innerRadius: number, outerRadius: number, hue: number, step: number): string {
    const innerArcStart = hue - 0.5 - (0.1 * (step - 1));
    const innerArcEnd = hue + 0.5 + (0.1 * (step - 1));
    const outerArcStart = hue - 0.5 - (0.1 * step);
    const outerArcEnd = hue + 0.5 + (0.1 * step);


    const innerStart = polarToCartesian(x, y, innerRadius, innerArcEnd);
    const innerEnd = polarToCartesian(x, y, innerRadius, innerArcStart);
    const outerStart = polarToCartesian(x, y, outerRadius, outerArcStart);
    const outerEnd = polarToCartesian(x, y, outerRadius, outerArcEnd);

    const slicePath = [
        "M",
        outerStart.x, outerStart.y,
        describeArc(x, y, outerRadius, outerArcStart, outerArcEnd),
        outerEnd.x, outerEnd.y,
        "L",
        innerStart.x, innerStart.y,
        describeArc(x, y, innerRadius, innerArcEnd, innerArcStart),
        innerEnd.x, innerEnd.y,
        "z"
    ].join(' ');

    return slicePath;

    function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): { x: number; y: number; } {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0; // Adapted from http://jsbin.com/quhujowota/1/edit?js,output

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
        };
    }

    function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number): string {
        const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
        const curve = endAngle - startAngle < 0 ? '0' : '1';

        const arc = [
            'A', radius, radius, 0, arcSweep, curve
        ].join(' ');

        return arc;
    }
}
