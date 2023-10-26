import { Fragment, HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { shadcnPalette } from "@/store";
import { Header, Header2 } from "./1-headers";
import { GridRow } from "./2-grid-row";
import { classNames } from "@/utils";

export function Section4_Chadcn({ className }: HTMLAttributes<HTMLUListElement>) {
    const { varGroups: { vars: snapItems } } = useSnapshot(shadcnPalette);
    const items = shadcnPalette.varGroups.vars;
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)}>
            <div className="container mx-auto max-w-xl grid grid-cols-[auto,1fr,1fr] gap-y-2">
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
