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

export const hueCopyTimersState = {
    colorTimeoutId: 0,
    grayTimeoutId: 0,
};

export const colorToCopyState = proxy({
    text: '',
});

export const clickState = proxy({
    colorName: '',
    // withCtrl: false,
});
