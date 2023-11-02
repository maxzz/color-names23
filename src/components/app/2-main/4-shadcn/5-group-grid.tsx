import { Fragment } from "react";
import { useSnapshot } from "valtio";
import { ThemeVars, shadcnAll } from "@/store";
import { HeaderColorValues, HeaderLengthValues } from "./1-headers";
import { GridRow } from "./2-grid-row";

export function GroupGrid({ themeVars, idx }: { themeVars: ThemeVars; idx: number }) {
    const snapT = useSnapshot(shadcnAll.themes);
    const snap = snapT[idx];
    console.log('snap idx', idx);
    console.log('snap', snap);
    console.log('snapT', snapT, idx);
    if (!snap) {
        return null;
    }
    
    
    return (
        <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">

            {snap.vars.length && (<>
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
            </>)}

        </div>
    );
}

