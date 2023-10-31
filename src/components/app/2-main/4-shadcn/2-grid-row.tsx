import { useSnapshot } from "valtio";
import { ThemeVarFB } from "@/store";
import { ColorInput } from "./3-color-input";
import { ValuePreviewBox } from "./4-value-preview-box";

type ValueInputAndBoxProps = {
    both: ThemeVarFB;
    field: keyof ThemeVarFB;
    isBackOrFore?: boolean;
};

function ValueInputAndBox({ both, field, isBackOrFore }: ValueInputAndBoxProps) {
    const bothSnap = useSnapshot(both, { sync: true });
    const colorSnap = bothSnap[field];
    const color = both[field];

    const previewBoxProps = {
        valueName: colorSnap?.name || '',
        value: colorSnap?.value || '',
        isUndefined: !colorSnap?.value && !isBackOrFore && (both.b?.isHsl || both.f?.isHsl),
        isColor: !!colorSnap?.value && colorSnap?.isHsl,
        isLength: !!colorSnap?.value && !colorSnap?.isHsl && isBackOrFore,
        isBackOrFore: isBackOrFore,
    };

    return (<>
        {isBackOrFore
            ? (
                <div className="flex items-center space-x-2">
                    <ColorInput color={color} colorSnap={colorSnap} />
                    <ValuePreviewBox {...previewBoxProps} />
                </div>
            ) : (
                <div className="pl-2 flex items-center space-x-2">
                    <ValuePreviewBox {...previewBoxProps} />
                    <ColorInput color={color} colorSnap={colorSnap} />
                </div>
            )
        }
    </>);
}

export function GridRow({ foreAndBack }: { foreAndBack: ThemeVarFB; }) {
    //TODO: add preview foregraound over background
    return (<>
        <div className="mr-4 text-sm text-foreground/70 dark:text-foreground/50 flex items-center">
            {foreAndBack.b?.name || foreAndBack.f?.name}
        </div>

        <ValueInputAndBox both={foreAndBack} field={'b'} isBackOrFore={true} />
        <ValueInputAndBox both={foreAndBack} field={'f'} />
    </>);
}
