import { useSnapshot } from "valtio";
import { shadcnAll } from "@/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/shadcn";
import { GroupGrid } from "./5-group-grid";
import { useEffect, useState } from "react";

function tabIdStr(idx: number): string {
    return `${idx}`;
}

function TableTabList() {
    const themes = useSnapshot(shadcnAll.themes);
    return (<>
        <TabsList>
            {themes.map((theme, idx) => (
                <TabsTrigger key={theme.themeId} value={tabIdStr(idx)}>{theme.name}</TabsTrigger>
            ))}
        </TabsList>
    </>);
}

function TableInTabs() {
    const { length } = useSnapshot(shadcnAll.themes);
    const [currentSubTab, setCurrentSubTab] = useState(0);
    useEffect(() => setCurrentSubTab((current) => current < length ? current : 0), [length]);

    if (!length) {
        return null;
    }

    return (
        <Tabs className="container max-w-xl" value={tabIdStr(currentSubTab)} onValueChange={(v) => setCurrentSubTab(+v)}>
            <TableTabList />

            {Array(length).fill(0).map((_, idx) => (

                <TabsContent value={tabIdStr(idx)} key={shadcnAll.themes[idx].themeId}>
                    <div className="p-4 bg-muted rounded shadow">
                        <div className="grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">
                            <GroupGrid idx={idx} />
                        </div>
                    </div>
                </TabsContent>
            ))}

        </Tabs>
    );
}

export function ThemeGrids2() {
    return (<>
        <TableInTabs />
    </>);
}
