import { subscribe } from "valtio";
import { HslName, clickState, hueColorWheelState } from "@/components/ui/color-names-distribution";
import { colorOverBackground } from "@/store";

subscribe(clickState, () => {
    colorOverBackground.background = clickState.colorName;
});

subscribe(hueColorWheelState, () => {
    colorOverBackground.color = hueColorWheelState.selectedColor?.dataKey;
});
