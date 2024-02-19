import { useSnapshot } from "valtio";
import { shadcnAll } from "@/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/shadcn";
import { GroupGrid } from "./5-group-grid";

export function TableTabs() {
    const themes = useSnapshot(shadcnAll.themes);
    return (<>
        <TabsList>
            {themes.map((theme, idx) => (
                <TabsTrigger key={theme.themeId} value={`tab${idx}`}>{theme.name}</TabsTrigger>
            ))}
        </TabsList>
    </>);
}

export function TableInTabs() {
    const { length } = useSnapshot(shadcnAll.themes);
    if (!length) {
        return null;
    }
    return (
        <Tabs className="container max-w-xl" defaultValue={`tab${0}`}>
            <TableTabs />

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
