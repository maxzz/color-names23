import { useSnapshot } from "valtio";
import { Input } from "@/components/ui/shadcn";
import { ThemeVar, colorCounters } from "@/store";

// function ColorCounter({ color }: { color: string; }) {
//     const { counters } = useSnapshot(colorCounters);
//     const counter = counters[color];
//     if (!counter) {
//         return <div />;
//     }
//     return (
//         <div className="pb-1 w-5 h-5 text-xs grid place-items-center">
//             {counter}
//         </div>
//     );
// }

export function ColorInput({ color, colorSnap }: { color?: ThemeVar; colorSnap?: ThemeVar; }) {
    if (!color?.value || !colorSnap?.value) {
        return <div />;
    }
    return (
        <div className="relative">
            <Input value={colorSnap.value} onChange={(e) => color.value = e.target.value} />
            <div className="absolute top-0.5 right-0 text-muted-foreground bg-transparent">
                {/* <ColorCounter color={colorSnap.value} /> */}
                {/* TODO: add lock color */}
            </div>
        </div>
    );
}
