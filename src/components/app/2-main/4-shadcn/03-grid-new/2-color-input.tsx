import { useSnapshot } from "valtio";
import { Input } from "@/components/ui/shadcn";
import { ThemeVar, colorCounters } from "@/store";

function ColorCounter({ color, themeId }: { color: string; themeId: number }) {
    const counters = useSnapshot(colorCounters);
    const counter = counters.themeRoot[themeId]?.[color];
    if (!counter || counter === 1) {
        return <div />;
    }
    return (
        <div className="pb-1 w-5 h-5 text-xs grid place-items-center">
            {counter}
        </div>
    );
}

export function ColorInput({ color, colorSnap }: { color?: ThemeVar; colorSnap?: ThemeVar; }) {
    if (!color?.varValue || !colorSnap?.varValue) {
        return <div />;
    }
    return (
        <div className="relative">
            <Input className="text-xs" value={colorSnap.varValue} onChange={(e) => color.varValue = e.target.value} />
            <div className="absolute top-0.5 right-0 text-muted-foreground bg-transparent">
                <ColorCounter color={colorSnap.varValue} themeId={colorSnap.themeId} />
                {/* TODO: add lock color */}
            </div>
        </div>
    );
}
