import { useState, useEffect } from "react";
import { getSvgRootElement, svgCoords } from "../original/utils-svg";

function zoomView(event: WheelEvent): boolean {
    const wheelView: SVGSVGElement | null = getSvgRootElement(event);
    if (!wheelView) {
        return false; // preventDefault false
    }

    var rect = wheelView.getBoundingClientRect();
    var dims = parseViewBox(wheelView);

    var zoomdir = event.deltaY < 0 ? -1 : 1;
    var scale = 1 + (zoomdir * 0.1);
    if (
        ((dims.w <= 333 || dims.h <= 400) && zoomdir < 0) ||
        ((dims.w > 1000 || dims.h > 1200) && zoomdir > 0)
    ) {
        // console.log('limited', {dims, zoomdir, scale});
        return false; // preventDefault false
    }
    // console.log('zooming', {dims, zoomdir, scale});

    var mpx = 0, mpy = 0, mpxpct = 0, mpypct = 0;
    mpx = event.clientX - rect.x;
    mpy = event.clientY - rect.y;
    mpxpct = mpx / rect.width;
    mpypct = mpy / rect.height;

    var svgCoord = svgCoords(wheelView, event);

    var newwidth = dims.w * scale;
    var newheight = dims.h * scale;

    var coords = { x: 0, y: 0, w: 0, h: 0 };

    coords.x = Math.round(svgCoord.x - (newwidth * mpxpct));
    coords.y = Math.round(svgCoord.y - (newheight * mpypct));
    coords.w = Math.round(newwidth);
    coords.h = Math.round(newheight);

    if (coords.w > 1000) coords.w = 1000;
    if (coords.h > 1200) coords.h = 1200;
    if (coords.x < 0) coords.x = 0;
    if (coords.y < 0) coords.y = 0;
    if (coords.x + coords.w > 1000) coords.x = 1000 - coords.w;
    if (coords.y + coords.h > 1200) coords.y = 1200 - coords.h;

    // if (dims.w === coords.w && dims.h === coords.h) { return false; /* preventDefault false */ } // OK but not needed

    changeViewBox(wheelView, coords);

    return true; // preventDefault true

    function parseViewBox(elem: SVGSVGElement) {
        return {
            x: elem.viewBox.baseVal.x,
            y: elem.viewBox.baseVal.y,
            w: elem.viewBox.baseVal.width,
            h: elem.viewBox.baseVal.height,
        };
    }

    function changeViewBox(elem: SVGSVGElement, coords: { x: number, y: number, w: number, h: number; }) {
        elem.viewBox.baseVal.x = coords.x;
        elem.viewBox.baseVal.y = coords.y;
        elem.viewBox.baseVal.width = coords.w;
        elem.viewBox.baseVal.height = coords.h;
    }
}

export function useZoom() {
    const [svgRef, setSvgRef] = useState<SVGSVGElement | null>();

    useEffect(() => {
        if (!svgRef) {
            return;
        }
        const handler = (event: WheelEvent) => {
            if (zoomView(event)) {
                event.preventDefault();
            }
        };
        svgRef.addEventListener('wheel', handler, { passive: false });
        return () => {
            svgRef.removeEventListener('wheel', handler);
        };
    }, [svgRef]);
    
    return setSvgRef;
}
