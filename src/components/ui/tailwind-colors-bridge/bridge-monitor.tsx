import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { ColorGroups } from "./tw-colors-types";
import { allColorsAtom, currentTwColorAtom } from "@/store";

// ./tailwind/tailwind-plugin-all-colors.js defines '.all-tw-colors' class with all colors and we put them into DOM.

export function TailwindAllColorsBridge() {
    const colorsRef = useRef<ColorGroups>({});
    const setColors = useSetAtom(allColorsAtom);
    const setCurrentTwColor = useSetAtom(currentTwColorAtom);
    
    useEffect(() => {
        const allColors: ColorGroups = colorsRef.current;
        setColors(allColors);
        if (allColors) {
            const initialColorValue = allColors?.['slate']?.['50'];
            initialColorValue && setCurrentTwColor({group: 'slate', key: '50', value: initialColorValue});
        }
    }, [colorsRef]);

    function getColors(el: HTMLDivElement | null) {
        const twAttr = el && getComputedStyle(el).getPropertyValue('--tm-tw-colors').replace(/^'(.*)'$/g, '$1');
        const colors = JSON.parse(twAttr || '[]');
        colorsRef.current = colors || {};
    }

    return (
        <div ref={getColors} className="hidden absolute all-tw-colors" />
    );
}

//TODO: save currentTwColorAtom value
//TODO: save allColors to local store to avoid grid shift on reload/on sub-app tab buttons change
