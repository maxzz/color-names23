import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

export type ColorContextType = {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
};

export const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode; }) {
    const [color, setColor] = useState<string>('0 0% 0%');
    return (
        <ColorContext.Provider value={{ color, setColor }}>
            {children}
        </ColorContext.Provider>
    );
}

export function useColorContext() {
    const context = useContext(ColorContext);
    if (context === undefined) {
        throw new Error('useColorContext must be used within a ColorProvider');
    }
    return context;
}
