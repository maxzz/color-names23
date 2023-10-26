import { subscribe } from "valtio";
import { clickState, hueColorWheelState } from "@/components/ui/color-names-distribution";
import { colorOverBackground } from "@/store";

subscribe(clickState, () => {
    colorOverBackground.background = clickState.colorName;
});

subscribe(hueColorWheelState, () => {
    const name = hueColorWheelState.selectedColor?.dataKey.split(',')[3] || '';
    colorOverBackground.color = name;
});
