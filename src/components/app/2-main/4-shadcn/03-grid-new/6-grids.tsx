import { useSnapshot } from "valtio";
import { shadcnAll } from "@/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/shadcn";
import { GroupGrid } from "./5-group-grid";

export function TableTabs() {
    const themes = useSnapshot(shadcnAll.themes);
    return (<>
        <TabsList>
            {themes.map((theme, idx) => (
                <TabsTrigger key={theme.themeId} value={`${theme.themeId}`}>{theme.name}</TabsTrigger>
            ))}
        </TabsList>
    </>);
}

export function TableInTabs() {
    const { length } = useSnapshot(shadcnAll.themes);
    return (
        <Tabs defaultValue="table1">
            <TableTabs />

            {Array(length).fill(0).map((_, idx) => (

                <TabsContent value={`${shadcnAll.themes[idx].themeId}`} key={shadcnAll.themes[idx].themeId}>
                    <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">
                        <GroupGrid idx={idx} />
                    </div>
                </TabsContent>
            ))}

        </Tabs>
    );
}

export function ThemeGrids2() {
    const { length } = useSnapshot(shadcnAll.themes);
    return (<>
        <TableInTabs />
    </>);
}
