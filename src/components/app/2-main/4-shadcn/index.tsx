import { HTMLAttributes } from "react";
import { Input } from "@/components/ui/shadcn";
import { classNames } from "@/utils";
import { useSnapshot } from "valtio";
import { shadcnPalette } from "@/store/4-shadcn";
import { ForeAndBack } from "@/store/4-shadcn/types";

function SingleColor({ foreAndBack }: { foreAndBack: ForeAndBack; }) {
    return (<>
        <div className="pb-1 text-sm text-foreground/70 dark:text-foreground/50 flex items-center">
            {foreAndBack.foreground?.name || foreAndBack.background?.name}
        </div>
        {foreAndBack.background
            ? (
                <div className="flex items-center space-x-2">
                    <Input value={foreAndBack.background.value} onChange={(e) => { }} />
                    <div className="aspect-square h-9 rounded" style={{ backgroundColor: `hsl(${foreAndBack.background.value})` }}></div>
                </div>
            )
            : <div className=""></div>
        }
        {foreAndBack.foreground
            ? (
                <div className="flex items-center space-x-2">
                    <div className="aspect-square h-9 rounded" style={{ backgroundColor: `hsl(${foreAndBack.foreground.value})` }}></div>
                    <Input value={foreAndBack.foreground.value} onChange={(e) => { }} />
                </div>
            )
            : <div className=""></div>
        }
    </>
    );
}

export function Section4_Chadcn({ className }: HTMLAttributes<HTMLUListElement>) {
    const snap = useSnapshot(shadcnPalette);
    const items = snap.vars.vars;
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)}>
            <div className="container mx-auto max-w-xl grid grid-cols-[auto,1fr,1fr] gap-x-4 gap-y-2">
                {items.map((foreAndBack, idx) => (
                    <SingleColor foreAndBack={foreAndBack} key={idx} />
                ))}
            </div>
        </div>
    );
}
