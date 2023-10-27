import { proxy, subscribe } from "valtio";
import { clickState, hueColorWheelState } from "@/components/ui/color-names-distribution";

export type ColorOverBackground = {
    color: string | undefined;      // string as HslName
    background: string | undefined; // string as HslName
};

export const colorOverBackground = proxy<ColorOverBackground>({
    color: undefined,
    background: undefined,
});

subscribe(hueColorWheelState, () => {
    colorOverBackground.color = hueColorWheelState.selectedColor?.dataKey;
});

subscribe(clickState, () => {
    colorOverBackground.background = clickState.colorName;
});
