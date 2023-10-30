import { Fragment, HTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { proxy, subscribe, useSnapshot } from "valtio";
import { shadcnPalette } from "@/store";
import { Header, Header2 } from "./1-headers";
import { GridRow } from "./2-grid-row";
import { classNames, cn } from "@/utils";
import { parseTextAsCSSvars, testToParseCss, testToParseCss2, testToParseJs } from "@/store/4-shadcn/parse";
import { TextareaAutoGrow, Input, Textarea, containerPaddingFontClasses, containerPaddingFontDebugClasses } from "@/components/ui/shadcn";

// const vars = parseTextAsCSSvars(testToParseCss2);
// console.log('vars', vars);

const parseText = proxy({
    text: '',
});

subscribe(parseText, () => {
    const vars = parseTextAsCSSvars(parseText.text);
    console.log('vars', vars);
});

function PasteArea() {
    const snap = useSnapshot(parseText, { sync: true });
    return (<>
        <Textarea
            value={snap.text}
            onChange={(e) => parseText.text = e.target.value}
            className="min-h-[36px] smallscroll resize-color [&::-webkit-resizer]:b1g-transparent [&::-webkit-resizer]:b1g-red-500 [&::-webkit-resizer]:rounded"
            rows={3}
            placeholder="Paste theme vars here"
            spellCheck={false}
        />

        <TextareaAutoGrow
            value={snap.text}
            onChange={(e) => parseText.text = e.target.value}
            rows={1}
            className="min-h-0"
            
            placeholder="Paste theme vars here"
            spellCheck={false}
        />
    </>);
}

export function Section4_Chadcn({ className }: HTMLAttributes<HTMLUListElement>) {
    const { varGroups: { vars: snapItems } } = useSnapshot(shadcnPalette);
    const items = shadcnPalette.varGroups.vars;
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)}>

            <div className="my-4">
                <PasteArea />
            </div>

            <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">
                <Header />
                {snapItems.map((foreAndBack, idx) => (
                    <Fragment key={`${idx}`}>
                        {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) && <GridRow foreAndBack={items[idx]} />}
                    </Fragment>
                ))}

                <Header2 />
                {snapItems.map((foreAndBack, idx) => (
                    <Fragment key={`${idx}-length`}>
                        {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) && <GridRow foreAndBack={items[idx]} />}
                    </Fragment>
                ))}

            </div>
        </div>
    );
}
