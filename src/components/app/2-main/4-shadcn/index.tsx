import { Fragment, HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { shadcnAll, themesCount } from "@/store";
import { classNames } from "@/utils";
import { PasteArea } from "./0-top-panel";
import { GroupGrid } from "./5-group-grid";

export function Section4_Chadcn({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    const { count } = useSnapshot(themesCount);
    console.log('snapthemes', [...Array(count)].map(i=>0));

    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)} {...rest}>
            <div className="my-4">
                <PasteArea />
            </div>

            {[...Array(count)].map(i=>0).map((theme, idx) => (
                <Fragment key={idx}>
                    <GroupGrid themeVars={shadcnAll.themes[idx]} />
                </Fragment>
            ))}
        </div>
    );
}
