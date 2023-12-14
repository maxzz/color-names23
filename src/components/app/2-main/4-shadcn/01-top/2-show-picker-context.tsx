import { ColorPickerState, hsvaToHexa } from "@/components/ui/color-picker";
import { FormatPickerState } from "@/components/ui/color-picker/ui-state-format";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { proxy, subscribe } from "valtio";

export type ColorPickerContextType = {
    color: ColorPickerState;
    format: FormatPickerState;
};

export const ColorPickerContext = createContext<ColorPickerContextType | undefined>(undefined);

type ColorPickerProviderProps = {
    children: ReactNode;
    onColorChange?: (color: string) => void;
    onFormatChange?: (format: number) => void;
};

export function ColorPickerProvider({ children, onColorChange, onFormatChange }: ColorPickerProviderProps) {
    const state = useState<ColorPickerContextType | undefined>(() => {
        return {
            color: proxy<ColorPickerState>({
                hsvaColor: { h: 0, s: 0, v: 0, a: 1 },
            }),
            format: proxy<FormatPickerState>({
                formatIdx: 0,
            }),
        };
    })[0];

    useEffect(() => {
        if (state) {
            if (onColorChange) {
                const unsubscribe = subscribe(state.color, () => {
                    onColorChange(hsvaToHexa(state.color.hsvaColor));
                });
                return () => unsubscribe();
            }
        }
    }, [state, onColorChange]);

    useEffect(() => {
        if (state) {
            if (onFormatChange) {
                const unsubscribe = subscribe(state.format, () => {
                    onFormatChange(state.format.formatIdx);
                });
                return () => unsubscribe();
            }
        }
    }, [state, onFormatChange]);

    return (
        <ColorPickerContext.Provider value={state}>
            {children}
        </ColorPickerContext.Provider>
    );
}

export function useColorPickerContext() {
    const context = useContext(ColorPickerContext);
    if (context === undefined) {
        throw new Error('useColorPickerContext must be used within a ColorProvider');
    }
    return context;
}
