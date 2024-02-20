import { useSnapshot } from "valtio";
import { shadcnAll } from "@/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/shadcn";
import { GroupGrid } from "./5-group-grid";
import { useState } from "react";

function TableTabList() {
    const themes = useSnapshot(shadcnAll.themes);
    return (<>
        <TabsList>
            {themes.map((theme, idx) => (
                <TabsTrigger key={theme.themeId} value={`tab${idx}`}>{theme.name}</TabsTrigger>
            ))}
        </TabsList>
    </>);
}

function TableInTabs() {
    const [currentSubTab, setCurrentSubTab] = useState(`tab${0}`);
    const { length } = useSnapshot(shadcnAll.themes);
    if (!length) {
        return null;
    }
    return (
        <Tabs className="container max-w-xl" value={currentSubTab}
            onValueChange={(v) => {
                console.log('changed', v);
                setCurrentSubTab(v);
            }}
        >
            <TableTabList />

            {Array(length).fill(0).map((_, idx) => (

                <TabsContent value={`tab${idx}`} key={shadcnAll.themes[idx].themeId}>
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
