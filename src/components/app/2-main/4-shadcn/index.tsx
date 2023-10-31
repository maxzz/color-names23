import { Fragment, HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { OneThemeVars, parseText, shadcnPalette } from "@/store";
import { Header, Header2 } from "./1-headers";
import { GridRow } from "./2-grid-row";
import { classNames } from "@/utils";
import { Textarea } from "@/components/ui/shadcn";

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

function RenderGroup({ themeVars, className, ...rest }: { themeVars: OneThemeVars; } & HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(themeVars);
    return (<>
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)} {...rest}>

            <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">
                <Header />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${idx}`}>
                        {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
                    </Fragment>
                ))}

                <Header2 />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${idx}-length`}>
                        {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
                    </Fragment>
                ))}

            </div>
        </div>

    </>);
}

export function Section4_Chadcn(props: HTMLAttributes<HTMLDivElement>) {
    const { varGroups: snapVarGroups } = useSnapshot(shadcnPalette);
    console.log('snapVarGroups', snapVarGroups);
    
    return (
        <div {...props}>
            <div className="my-4">
                <PasteArea />
            </div>

            {!!snapVarGroups.length && (
                snapVarGroups.map((themeVars, idx) => (
                    <Fragment key={idx}>
                        <RenderGroup themeVars={shadcnPalette.varGroups[idx]} />
                    </Fragment>
                ))
            )}
        </div>
    );
}
