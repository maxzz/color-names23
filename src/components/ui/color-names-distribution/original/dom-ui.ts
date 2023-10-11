export const uiElements: {
    target: SVGSVGElement;
    wheelWell: SVGCircleElement;

    colorText: SVGTextElement;
    colorName: SVGTSpanElement;
    colorHSL: SVGTSpanElement;

    grayText: SVGTextElement;
    grayName: SVGTSpanElement;
    grayHSL: SVGTSpanElement;
} = {
    target: document.getElementById('color-wheel')! as unknown as SVGSVGElement,
    wheelWell: document.getElementById('wheel-well')! as unknown as SVGCircleElement,

    colorText: document.getElementById('colorText')! as unknown as SVGTextElement,
    colorName: document.getElementById('colorName')! as unknown as SVGTSpanElement,
    colorHSL: document.getElementById('colorHSL')! as unknown as SVGTSpanElement,

    grayText: document.getElementById('grayText')! as unknown as SVGTextElement,
    grayName: document.getElementById('grayName')! as unknown as SVGTSpanElement,
    grayHSL: document.getElementById('grayHSL')! as unknown as SVGTSpanElement,
};
