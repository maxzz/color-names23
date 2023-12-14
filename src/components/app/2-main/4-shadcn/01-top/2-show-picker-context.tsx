import { ColorPickerState } from "@/components/ui/color-picker";
import { FormatPickerState } from "@/components/ui/color-picker/ui-state-format";
import { ReactNode, createContext, useContext, useState } from "react";
import { proxy } from "valtio";

export type ColorPickerContextType = {
    color: ColorPickerState;
    format: FormatPickerState;
};

export const ColorPickerContext = createContext<ColorPickerContextType | undefined>(undefined);

export function ColorPickerProvider({ children }: { children: ReactNode; }) {
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
