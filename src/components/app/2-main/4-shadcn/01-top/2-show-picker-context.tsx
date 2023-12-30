import { ColorPickerState, hsvaToHexa } from "@/components/ui/color-picker";
import { FormatPickerState } from "@/components/ui/color-picker/ui-state-format";
import { Dispatch, MouseEvent, MutableRefObject, ReactNode, SetStateAction, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { proxy, subscribe } from "valtio";

export type ColorPickerContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    anchorRef: MutableRefObject<HTMLElement | null>;    // shared ref with PopoverAnchor set by caller before opening
    color: ColorPickerState;                            // coplor proxy state
    format: FormatPickerState;                          // format proxy state
};

export const ColorPickerContext = createContext<ColorPickerContextType | undefined>(undefined);

export type ColorPickerProviderProps = {
    onColorChange?: (color: string) => void;
    onFormatChange?: (format: number) => void;
};

export const pickerClassname = "c-picker";

export function ColorPickerProvider({ children, onColorChange, onFormatChange }: { children: ReactNode; } & ColorPickerProviderProps) {
    const anchorRef = useRef<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);

    const onMouseDown = useCallback(
        (event: MouseEvent<HTMLElement, MouseEvent>) => {
            event.preventDefault();

            const isPicker = event.currentTarget.classList.contains(pickerClassname);
            const isSameAnchor = anchorRef.current === event.currentTarget;
            anchorRef.current = event.currentTarget;

            setOpen((open) => {
                if (!isPicker || isSameAnchor) {
                    return !open;
                } else if (isPicker && !open) {
                    return true;
                } else if (isPicker && open) {
                    setTimeout(() => setOpen(true), 200);
                }
                return open;
            });
            // if (!isPicker || isSameAnchor) {
            //     setOpen(p => !p);
            // } else if (isPicker && !open) {
            //     setOpen(true);
            // } else if (isPicker && open) {
            //     setTimeout(() => setOpen(true), 200);
            // }
        }, []
    );

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

    function _onMouseDown(event: MouseEvent<HTMLElement, MouseEvent>) {
        event.preventDefault();

        const isPicker = event.currentTarget.classList.contains(pickerClassname);
        const isSameAnchor = anchorRef.current === event.currentTarget;
        anchorRef.current = event.currentTarget;

        if (!isPicker || isSameAnchor) {
            setOpen(p => !p);
        } else if (isPicker && !open) {
            setOpen(true);
        } else if (isPicker && open) {
            setTimeout(() => setOpen(true), 200);
        }
    }

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
