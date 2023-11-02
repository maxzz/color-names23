import { HTMLAttributes, memo } from "react";
import { useSnapshot } from "valtio";
import { shadcnAll } from "@/store";
import { classNames } from "@/utils";
import { PasteArea } from "./0-top-panel";
import { Grid, GroupGrid } from "./5-group-grid";
import { PickerExample } from "@/components/ui/shadcn/gradient-color-picker";

const GroupGridMemo = memo(GroupGrid);

function BottomPanel() {
    const themes = useSnapshot(shadcnAll.themes);
    return (<>
        {themes.map((_, idx) => (
            <Grid idx={idx} key={idx} />
        ))}
    </>);
}

function BottomPanel2() {
    //const themes = useSnapshot(shadcnAll.themes);
    return (<>
        <GroupGrid>
            <BottomPanel />
        </GroupGrid>
    </>);
}

export function Section4_Chadcn({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)} {...rest}>

            <div className="my-4">
                <PasteArea />
                {/* <PickerExample /> */}
            </div>


            <BottomPanel2 />
        </div>
    );
}
