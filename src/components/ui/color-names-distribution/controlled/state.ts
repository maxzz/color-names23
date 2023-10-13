import { proxy } from "valtio";

type Color = {
    fill: string;
    dataKey: string;
    type: "color" | "gray";
};

type HueColorWheelState = {
    selectedColor: Color | null;
    selectedGray: Color | null;
    colorTimeoutId: number;
    grayTimeoutId: number;
};

export const hueColorWheelState = proxy<HueColorWheelState>({
    selectedColor: null,
    selectedGray: null,
    colorTimeoutId: 0,
    grayTimeoutId: 0,
});

export const colorToCopyState = proxy({
    text: '',
});
