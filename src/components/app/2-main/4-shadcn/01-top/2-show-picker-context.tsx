import { Dispatch, MouseEvent, MutableRefObject, ReactNode, SetStateAction, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ColorPickerState, hsvaToHexa } from "@/components/ui/color-picker";
import { FormatPickerState } from "@/components/ui/color-picker/ui-state-format";
import { proxy, subscribe } from "valtio";

export type ColorPickerContext = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onMouseDown: (event: MouseEvent<HTMLElement, MouseEvent>) => void;
    anchorRef: MutableRefObject<HTMLElement | null>;    // shared ref with PopoverAnchor set by caller before opening
    color: ColorPickerState;                            // coplor proxy state
    format: FormatPickerState;                          // format proxy state
};

const colorPickerContext = createContext<ColorPickerContext | undefined>(undefined);

export function useColorPickerContext(): ColorPickerContext {
    const context = useContext(colorPickerContext);
    if (context === undefined) {
        throw new Error('useColorPickerContext must be used within a ColorProvider');
    }
    return context;
}

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
        }, []
    );

    const proxies = useState<{ color: ColorPickerState; format: FormatPickerState; }>(() => ({
        color: proxy<ColorPickerState>({
            hsvaColor: { h: 0, s: 0, v: 0, a: 1 },
        }),
        format: proxy<FormatPickerState>({
            formatIdx: 0,
        }),
    }))[0];

    useEffect(() => {
        if (proxies && onColorChange) {
            const unsubscribe = subscribe(proxies.color, () => {
                onColorChange(hsvaToHexa(proxies.color.hsvaColor));
            });
            return () => unsubscribe();
        }
    }, [proxies, onColorChange]);

    useEffect(() => {
        if (proxies && onFormatChange) {
            const unsubscribe = subscribe(proxies.format, () => {
                onFormatChange(proxies.format.formatIdx);
            });
            return () => unsubscribe();
        }
    }, [proxies, onFormatChange]);

    return (
        <colorPickerContext.Provider
            value={{
                open,
                setOpen,
                onMouseDown,
                anchorRef,
                ...proxies,
            }}
        >
            {children}
        </colorPickerContext.Provider>
    );
}
