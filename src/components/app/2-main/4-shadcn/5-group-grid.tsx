import { Fragment, memo } from "react";
import { useSnapshot } from "valtio";
import { ThemeVars, shadcnAll } from "@/store";
import { HeaderColorValues, HeaderLengthValues } from "./1-headers";
import { GridRow } from "./2-grid-row";

/*
--primary: 161 56% 35%;
--background: 159 65% 4%;
--foreground: 159 10% 97.5%;

 --primary: 0 100% 50%;

:root {
    --primary: 161 56% 35%;
    --background: 159 65% 4%;
    --foreground: 159 10% 97.5%;
}
.dark {
    --primary: 0 100% 50%;
}
*/

const GridRowMemo = memo(GridRow)

export function GroupGrid({ idx }: { idx: number }) {
    const themeVars: ThemeVars = shadcnAll.themes[idx];
    const snap = useSnapshot(themeVars);
    // console.log('snap idx', idx);
    // console.log('snap', snap);
    
    // if (!snap) {
    //     return null;
    // }
    
    
    return (
        <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">

            {snap.vars.length && (<>
                <HeaderColorValues />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${idx}`}>
                        {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) && <GridRowMemo foreAndBack={themeVars.vars[idx]} />}
                    </Fragment>
                ))}

                <HeaderLengthValues />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${idx}-length`}>
                        {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) && <GridRowMemo foreAndBack={themeVars.vars[idx]} />}
                    </Fragment>
                ))}
            </>)}

        </div>
    );
}

