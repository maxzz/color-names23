import { Fragment, HTMLAttributes } from "react";
import { Input, Label } from "@/components/ui/shadcn";
import { classNames } from "@/utils";
import { useSnapshot } from "valtio";
import { shadcnPalette } from "@/store/4-shadcn";

function SingleColor({ label, color }: { label: string; color: string; }) {
    return (<>
        {/* <Label className="flex items-center"> */}
        <div className="pb-1 text-sm text-foreground/70 dark:text-foreground/50 flex items-center">
            {label}
        </div>
        <div className="flex items-center space-x-2">
            <Input value={color} onChange={(e) => { }} />
            <div className="aspect-square h-9 rounded" style={{ backgroundColor: `hsl(${color})` }}></div>
        </div>
        {/* </Label> */}
    </>
    );
}

// function PairColors({ color1, color2 }: { color1: string; color2: string; }) {
//     return (
//         <div className="flex items-center justify-between">
//             <SingleColor label="text" color="red" />
//             <SingleColor label="background" color="red" />
//         </div>
//     );
// }

type Pair = [key: string, value: string];
type PairWithOrder = {
    pair: Pair;
    order: number;
};
type GroupedPair = {
    foreground: Pair;
    background: Pair;
};

function groupNames(names: Pair[]): [Pair, Pair][] {
    const rv: [Pair, Pair][] = [];
    const pairs: PairWithOrder[] = names.map((pair, idx) => ({ pair, order: idx }));
    const namedPairs: Record<string, PairWithOrder> = {};
    // names.forEach((pair) => {
    //     const isForeground = pair[0].includes("-foreground");
    //     namedPairs[isForeground ? pair[0] : pair[1]] = { pair, order: 0 };

    return rv;
}

export function Section4_Chadcn({ className }: HTMLAttributes<HTMLUListElement>) {
    const snap = useSnapshot(shadcnPalette);
    const items = snap.vars.vars;
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)}>
            <div className="container mx-auto max-w-md grid grid-cols-4 gap-2">
                {/* <PairColors color1="red" color2="red" /> */}
                {/* <SingleColor label="text" color={snap} /> */}
                {items.map(([name, color]) => {
                    const isForeground = name.includes("-foreground");
                    return (
                        isForeground
                            ? (
                                <Fragment key={name}>
                                    <div className=""></div>
                                    <div className=""></div>
                                    <SingleColor label={name} color={color} />
                                </Fragment>
                            )
                            : (
                                <Fragment key={name}>
                                    <SingleColor label={name} color={color} />
                                    <div className=""></div>
                                    <div className=""></div>
                                </Fragment>
                            ));
                })}
            </div>
        </div>
    );
}
