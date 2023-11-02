import { Fragment } from "react";
import { useSnapshot } from "valtio";
import { ThemeVars, shadcnAll } from "@/store";
import { HeaderColorValues, HeaderLengthValues } from "./1-headers";
import { GridRow } from "./4-grid-row";

export function GroupGrid({ themeVars, idx }: { themeVars: ThemeVars; idx: number }) {
    const snapThemes = useSnapshot(shadcnAll.themes);
    const snap = snapThemes[idx];
    console.log(`---1 store store themeVars.vars = `, JSON.stringify(themeVars.vars, null, 4));
    console.log(`---2 snapThemes`, JSON.stringify(snapThemes, null, 4));
    console.log(`---3 snap[${idx}]`, JSON.stringify(snap, null, 4));
    if (!snap) {
        return null;
    }
    
    
    return (
        <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">

            {snap.vars.length && (<>
                <HeaderColorValues />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${foreAndBack.b?.id || foreAndBack.f?.id || idx}`}>
                        {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
                    </Fragment>
                ))}

                <HeaderLengthValues />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${foreAndBack.b?.id || foreAndBack.f?.id || idx}-length`}>
                        {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
                    </Fragment>
                ))}
            </>)}

        </div>
    );
    // return (
    //     <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">

    //         {snap.vars.length && (<>
    //             <HeaderColorValues />
    //             {snap.vars.map((foreAndBack, idx) => (
    //                 <Fragment key={`${idx}`}>
    //                     {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
    //                 </Fragment>
    //             ))}

    //             <HeaderLengthValues />
    //             {snap.vars.map((foreAndBack, idx) => (
    //                 <Fragment key={`${idx}-length`}>
    //                     {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
    //                 </Fragment>
    //             ))}
    //         </>)}

    //     </div>
    // );
}

