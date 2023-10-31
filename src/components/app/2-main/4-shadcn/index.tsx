import { Fragment, HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { parseText, shadcnAll } from "@/store";
import { classNames } from "@/utils";
import { Textarea } from "@/components/ui/shadcn";
import { GroupGrid } from "./5-group-grid";

function PasteArea() {
    const snap = useSnapshot(parseText, { sync: true });
    return (<>
        <Textarea
            value={snap.text}
            onChange={(e) => parseText.text = e.target.value}
            className="min-h-[36px] text-xs smallscroll resizer [&::-webkit-resizer]:rounded [&::-webkit-resizer]:[backgroundSize:80%_80%]"
            rows={1}
            placeholder="Paste theme vars here"
            spellCheck={false}
        />

        {/* <TextareaAutoGrow
            value={snap.text}
            onChange={(e) => parseText.text = e.target.value}
            rows={1}
            className="min-h-0"
            
            placeholder="Paste theme vars here"
            spellCheck={false}
        /> */}
    </>);
}

export function Section4_Chadcn({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    const { themes: varGroups } = useSnapshot(shadcnAll);
    console.log('snapVarGroups', varGroups);

    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)} {...rest}>
            <div className="my-4">
                <PasteArea />
            </div>

            {varGroups.map((themeVars, idx) => (
                <Fragment key={idx}>
                    <GroupGrid themeVars={shadcnAll.themes[idx]} />
                </Fragment>
            ))}
        </div>
    );
}
