import { proxy } from "valtio";

type Color = {
    fill: string;
    dataKey: string;
    type: "color" | "gray";
};

type HueColorWheelState = {
    selectedColor: Color | null;
    selectedGray: Color | null;
};

export const hueColorWheelState = proxy<HueColorWheelState>({
    selectedColor: null,
    selectedGray: null,
});
