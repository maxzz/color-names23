import { proxy } from "valtio";

export type ColorOverBackground = {
    color: string | undefined;      // string as HslName
    background: string | undefined; // string as HslName
};

export const colorOverBackground = proxy<ColorOverBackground>({
    color: undefined,
    background: undefined,
});
