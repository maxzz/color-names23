import { useSnapshot } from "valtio";
import { shadcnAll } from "@/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/shadcn";
import { GroupGrid } from "./5-group-grid";

export function TableInTabs() {
    return (
        <Tabs defaultValue="table1">
            <TabsList>
                <TabsTrigger value="table1">Simple table</TabsTrigger>
                <TabsTrigger value="table2">Data table</TabsTrigger>
            </TabsList>

            <TabsContent value="table1">
                {/* <SimpleTableDemo className="m-auto max-w-sm" /> */}
                1
            </TabsContent>

            <TabsContent value="table2">
                {/* <DataTableDemo /> */}
                2
            </TabsContent>
        </Tabs>
    );
}

export function ThemeGrids2() {
    const { length } = useSnapshot(shadcnAll.themes);
    return (<>
        <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">
            {Array(length).fill(0).map((_, idx) => (
                <GroupGrid idx={idx} key={shadcnAll.themes[idx].themeId} />
            ))}
        </div>
        <TableInTabs />
        </>
    );
}
