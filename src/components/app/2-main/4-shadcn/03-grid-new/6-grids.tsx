import { useSnapshot } from "valtio";
import { shadcnAll } from "@/store";
import { GroupGrid } from "./5-group-grid";

export function ThemeGrids2() {
    const { length } = useSnapshot(shadcnAll.themes);
    return (
        <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">
            {Array(length).fill(0).map((_, idx) => (
                <GroupGrid idx={idx} key={shadcnAll.themes[idx].themeId} />
            ))}
        </div>
    );
}
