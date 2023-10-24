import { Fragment, HTMLAttributes } from "react";
import { Input } from "@/components/ui/shadcn";
import { classNames } from "@/utils";
import { useSnapshot } from "valtio";
import { shadcnPalette } from "@/store/4-shadcn";
import { CssVarNameValue, ForeAndBack } from "@/store/4-shadcn/types";
import { ValuePreviewBox } from "./value-preview-box";

function ValueInputAndBox({ color, field, both, isBackOrFore }: { color?: CssVarNameValue; field: keyof ForeAndBack; both: ForeAndBack; isBackOrFore?: boolean; }) {
    const bothSnap = useSnapshot(both, { sync: true });
    const colorSnap = bothSnap[field];
    const isEmpty = !color?.value || !colorSnap?.value;
    return (<>
        {isBackOrFore
            ? (
                <div className="flex items-center space-x-2">
                    {!isEmpty && <Input value={colorSnap.value} onChange={(e) => { color.value = e.target.value }} />}
                    <ValuePreviewBox color={color} both={both} isBackOrFore={isBackOrFore} />
                </div>
            ) : (
                <div className="ml-2 flex items-center space-x-2">
                    <ValuePreviewBox color={color} both={both} isBackOrFore={isBackOrFore} />
                    {!isEmpty && <Input value={colorSnap.value} onChange={(e) => { color.value = e.target.value }} />}
                </div>
            )
        }
    </>);
}

function SingleColor({ foreAndBack }: { foreAndBack: ForeAndBack; }) {
    const notHsl = !foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl;
    //TODO: add preview foregraound over background
    return (<>
        <div className="mr-4 text-sm text-foreground/70 dark:text-foreground/50 flex items-center">
            {foreAndBack.b?.name || foreAndBack.f?.name}
        </div>

        <ValueInputAndBox color={foreAndBack.b} field={'b'} both={foreAndBack} isBackOrFore={true} />
        <ValueInputAndBox color={foreAndBack.f} field={'f'}both={foreAndBack} />
    </>);
}

function Header() {
    return (<>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b">Name</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b text-right">Background</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b ml-2">Foreground</div>
    </>);
}

function Header2() {
    return (<>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b mt-4"></div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b mt-4 text-right">Length values</div>
        <div className="mb-1 text-xs text-muted-foreground border-border border-b mt-4 ml-2"></div>
    </>);
}

export function Section4_Chadcn({ className }: HTMLAttributes<HTMLUListElement>) {
    const { varGroups: { vars: snapItems } } = useSnapshot(shadcnPalette);
    //const snapItems = snap.varGroups.vars;
    const items = shadcnPalette.varGroups.vars;
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)}>
            <div className="container mx-auto max-w-xl grid grid-cols-[auto,1fr,1fr] gap-y-2">
                <Header />
                {snapItems.map((foreAndBack, idx) => (
                    <Fragment key={`${idx}`}>
                        {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) && <SingleColor foreAndBack={items[idx]} />}
                    </Fragment>
                ))}

                <Header2 />
                {snapItems.map((foreAndBack, idx) => (
                    <Fragment key={`${idx}-length`}>
                        {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) && <SingleColor foreAndBack={items[idx]} />}
                    </Fragment>
                ))}

            </div>
        </div>
    );
}
