import { useSnapshot } from "valtio";
import { CssVarNameValue, ForeAndBack } from "@/store/4-shadcn/types";
import { Input } from "@/components/ui/shadcn";
import { ValuePreviewBox } from "./3-value-preview-box";

function ValueInputAndBox({ color, field, both, isBackOrFore }: { color?: CssVarNameValue; field: keyof ForeAndBack; both: ForeAndBack; isBackOrFore?: boolean; }) {
    const bothSnap = useSnapshot(both, { sync: true });
    const colorSnap = bothSnap[field];
    const isEmpty = !color?.value || !colorSnap?.value;
    return (<>
        {isBackOrFore
            ? (
                <div className="flex items-center space-x-2">
                    {!isEmpty && <Input value={colorSnap.value} onChange={(e) => { color.value = e.target.value }} />}
                    <ValuePreviewBox color={colorSnap} both={both} isBackOrFore={isBackOrFore} />
                </div>
            ) : (
                <div className="ml-2 flex items-center space-x-2">
                    <ValuePreviewBox color={colorSnap} both={both} isBackOrFore={isBackOrFore} />
                    {!isEmpty && <Input value={colorSnap.value} onChange={(e) => { color.value = e.target.value }} />}
                </div>
            )
        }
    </>);
}

export function GridRow({ foreAndBack }: { foreAndBack: ForeAndBack; }) {
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
