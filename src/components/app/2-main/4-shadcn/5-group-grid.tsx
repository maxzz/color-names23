import { Fragment } from "react";
import { useSnapshot } from "valtio";
import { ThemeVars } from "@/store";
import { HeaderColorValues, HeaderLengthValues } from "./1-headers";
import { GridRow } from "./2-grid-row";

export function GroupGrid({ themeVars }: { themeVars: ThemeVars; }) {
    const snap = useSnapshot(themeVars);
    return (
        <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">

            <HeaderColorValues />
            {snap.vars.map((foreAndBack, idx) => (
                <Fragment key={`${idx}`}>
                    {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
                </Fragment>
            ))}

            <HeaderLengthValues />
            {snap.vars.map((foreAndBack, idx) => (
                <Fragment key={`${idx}-length`}>
                    {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
                </Fragment>
            ))}

        </div>
    );
}

