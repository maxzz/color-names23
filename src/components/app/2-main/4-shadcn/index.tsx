import { Fragment, HTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { proxy, subscribe, useSnapshot } from "valtio";
import { shadcnPalette } from "@/store";
import { Header, Header2 } from "./1-headers";
import { GridRow } from "./2-grid-row";
import { classNames, cn } from "@/utils";
import { parseTextAsCSSvars, testToParseCss, testToParseCss2, testToParseJs } from "@/store/4-shadcn/parse";
import { AutoGrowTextarea, Input, textareaPaddingFontClasses, textareaPaddingFontDebugClasses } from "@/components/ui/shadcn";
import { Textarea } from "@/components/ui/shadcn/textarea";

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
    return (<div className="py-4 resize-y bg-red-300">
        <Textarea
            value={snap.text}
            onChange={(e) => parseText.text = e.target.value}
            className="min-h-[36px] smallscroll resize-none"
            rows={1}
            placeholder="Paste theme vars here"
            spellCheck={false}
        />
    </div>);
}

export function Section4_Chadcn({ className }: HTMLAttributes<HTMLUListElement>) {
    const { varGroups: { vars: snapItems } } = useSnapshot(shadcnPalette);
    const items = shadcnPalette.varGroups.vars;
    const [value, setValue] = useState('');
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)}>

            <div className="my-4">
                <PasteArea />
                <AutoGrowTextarea
                    rows={1}
                    className="min-h-[36px]"
                    // className="min-h-0"
                    textareaPaddingFont={cn(textareaPaddingFontDebugClasses, textareaPaddingFontClasses)}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
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
