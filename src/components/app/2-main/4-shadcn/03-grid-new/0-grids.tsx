import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { shadcnAll } from "@/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/shadcn";
import { GroupGrid } from "./5-group-grid";

function tabIdStr(idx: number): string {
    return `${idx}`;
}

function NameTabs() {
    const themes = useSnapshot(shadcnAll.themes);
    return (<>
        <TabsList>
            {themes.map((theme, idx) => (
                <TabsTrigger key={theme.themeId} value={tabIdStr(idx)}>{theme.name}</TabsTrigger>
            ))}
        </TabsList>
    </>);
}

function Content({ length }: { length: number; }) {
    return (<>
        {Array(length).fill(0).map((_, idx) => (

            <TabsContent value={tabIdStr(idx)} key={shadcnAll.themes[idx].themeId}>
                <div className="p-4 bg-muted rounded shadow">
                    <div className="grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">
                        <GroupGrid idx={idx} />
                    </div>
                </div>
            </TabsContent>
        ))}
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
            <NameTabs />
            <Content length={length} />
        </Tabs>
    );
}

export function ThemeGrids2() {
    return (
        <TableInTabs />
    );
}
