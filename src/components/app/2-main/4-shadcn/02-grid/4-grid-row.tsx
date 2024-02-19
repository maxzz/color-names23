import { useSnapshot } from "valtio";
import { ThemeVarFBR } from "@/store";
import { ColorInput } from "./2-color-input";
import { ColorBox, ColorBoxProps } from "./3-color-box";

type ValueInputAndBoxProps = {
    both: ThemeVarFBR2;
    field: keyof ThemeVarFBR2;
    isBackOrFore?: boolean;
};

type ThemeVarFBR2 = Pick<ThemeVarFBR, 'f' | 'b'>

function ValueInputAndBox({ both, field, isBackOrFore }: ValueInputAndBoxProps) {
    const bothSnap = useSnapshot(both, { sync: true });
    const colorSnap = bothSnap[field];
    const color = both[field];

    const colorBoxProps: ColorBoxProps = {
        varName: colorSnap?.varName || '',
        varValue: colorSnap?.varValue || '',
        isUndefined: !colorSnap?.varValue && !isBackOrFore && (both.b?.isHsl || both.f?.isHsl),
        isColor: !!colorSnap?.varValue && colorSnap?.isHsl,
        isLength: !!colorSnap?.varValue && !colorSnap?.isHsl && isBackOrFore,
        isBackOrFore: isBackOrFore,
    };

    return (<>
        {isBackOrFore
            ? (
                <div className="flex items-center space-x-2">
                    <ColorInput color={color} colorSnap={colorSnap} />
                    <ColorBox {...colorBoxProps} />
                </div>
            ) : (
                <div className="pl-2 flex items-center space-x-2">
                    <ColorBox {...colorBoxProps} />
                    <ColorInput color={color} colorSnap={colorSnap} />
                </div>
            )
        }
    </>);
}

export function GridRow({ foreAndBack }: { foreAndBack: ThemeVarFBR; }) {
    //TODO: add preview foregraound over background
    return (<>
        <div className="mr-4 text-sm text-foreground/70 dark:text-foreground/50 flex items-center">
            {foreAndBack.b?.varName || foreAndBack.f?.varName}
        </div>

        <ValueInputAndBox both={foreAndBack} field={'b'} isBackOrFore={true} />
        <ValueInputAndBox both={foreAndBack} field={'f'} />
    </>);
}
