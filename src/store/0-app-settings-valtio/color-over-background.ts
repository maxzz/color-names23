import { proxy, subscribe } from "valtio";
import { clickState, hueColorWheelState } from "@/components/ui/color-names-distribution";
import { HslName, contrastRatio } from "@/utils";

export type ColorOverBackground = {
    color: string | undefined;      // string as HslName
    background: string | undefined; // string as HslName
    contrast: number | undefined;   // text over background contrast ratio
};

export const colorOverBackground = proxy<ColorOverBackground>({
    color: undefined,
    background: undefined,
    contrast: undefined,
});

function updateContrast(): void {
    if (colorOverBackground.color && colorOverBackground.background) {
        const f = colorOverBackground.color.split(',') as HslName;
        const b = colorOverBackground.background.split(',')as HslName;
        colorOverBackground.contrast = +contrastRatio(f, b).toFixed(2);
    } else {
        colorOverBackground.contrast = undefined;
    }
}

subscribe(hueColorWheelState, () => {
    colorOverBackground.color = hueColorWheelState.selectedColor?.dataKey;
    updateContrast();
});

subscribe(clickState, () => {
    colorOverBackground.background = clickState.colorName;
    updateContrast();
});
