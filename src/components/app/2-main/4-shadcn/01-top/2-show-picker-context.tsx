import { ColorPickerState, hsvaToHexa } from "@/components/ui/color-picker";
import { FormatPickerState } from "@/components/ui/color-picker/ui-state-format";
import { Dispatch, MutableRefObject, ReactNode, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react";
import { proxy, subscribe } from "valtio";

export type ColorPickerContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    anchorRef: MutableRefObject<HTMLElement | null>;    // share ref with PopoverAnchor set by caller before opening
    color: ColorPickerState;                            // coplor proxy state
    format: FormatPickerState;                          // format proxy state
};

export const ColorPickerContext = createContext<ColorPickerContextType | undefined>(undefined);

export type ColorPickerProviderProps = {
    onColorChange?: (color: string) => void;
    onFormatChange?: (format: number) => void;
};

export function ColorPickerProvider({ children, onColorChange, onFormatChange }: { children: ReactNode; } & ColorPickerProviderProps) {
    const anchorRef = useRef<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);

    const state = useState<ColorPickerContextType | undefined>(() => {
        return {
            open,
            setOpen,
            anchorRef,
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
