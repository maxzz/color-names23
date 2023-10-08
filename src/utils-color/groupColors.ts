import { ColorItem } from ".";

const { abs } = Math;
const getNumbersArray = (n: number) => [...Array(Math.floor(n)).keys()];
const isMonochrome = (color: ColorItem) => color.hsl[1] === 0; //TODO: 'show' is somehow lost here.
const isNonMonochrome = (color: ColorItem) => !isMonochrome(color);

function recursiveFilterByHue(colorList: ColorItem[], hue: number, tolerance: number): { list: ColorItem[], tolerance: number; } {

    const colors = colorList.filter((color: ColorItem) => abs(hue - color.hsl[0]) < tolerance);
    if (colors.length) {
        return {
            list: colors,
            tolerance
        };
    }

    return recursiveFilterByHue(colorList, hue, tolerance + 1);
}

function groupByLightness(filteredByHue: ColorItem[], tolerance: number): ColorItem[][] {

    function isNearbyLightness(toleranceIdx: number, color: ColorItem): boolean {
        const difference = 100 - color.hsl[2] - toleranceIdx * tolerance;
        const differenceLimit = tolerance / 2;
        if (abs(difference) === differenceLimit) {
            return difference > 0;
        }
        return abs(difference) < differenceLimit;
    }

    return getNumbersArray(100 / tolerance + 1)
        .map((t: number) => filteredByHue.filter((color: ColorItem) => isNearbyLightness(t, color)))
        .filter((group: ColorItem[]) => !!group.length);
}

type groupColorsParams = {
    colorList: ColorItem[];
    hue: number;
    startTolerance: number; // as start min tolerance value
    mono: boolean;
};

export function groupColors({ colorList, hue, startTolerance, mono }: groupColorsParams): { list: ColorItem[][]; tolerance: number; } {

    const baseColors = colorList.filter(mono ? isMonochrome : isNonMonochrome);
    const sortedColors = [...baseColors].sort((a, b) => a.hsl[1] - b.hsl[1]);
    const byHue = recursiveFilterByHue(sortedColors, (hue || 0) % 360, startTolerance);
    const byHueWithLightnessGroups = groupByLightness(byHue.list, startTolerance);

    return {
        list: byHueWithLightnessGroups,
        tolerance: byHue.tolerance
    };
}
