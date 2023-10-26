import { proxy } from "valtio";

export type ColorOverBackground = {
    color: string | undefined;
    background: string | undefined;
};

export const colorOverBackground = proxy<ColorOverBackground>({
    color: undefined,
    background: undefined,
});
