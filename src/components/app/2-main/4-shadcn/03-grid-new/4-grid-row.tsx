import { useSnapshot } from "valtio";
import { VarFBRU } from "@/store";
import { ColorInput } from "./2-color-input";
import { ColorBox, ColorBoxProps } from "./3-color-box";

type ValueInputAndBoxProps = {
    varFBRU: ThemeVarFBR2;
    field: keyof ThemeVarFBR2;
    isBackOrFore?: boolean;
};

type ThemeVarFBR2 = Pick<VarFBRU, 'f' | 'b'>

function ValueInputAndBox({ varFBRU, field, isBackOrFore }: ValueInputAndBoxProps) {
    const themeVarFBRSSnap = useSnapshot(varFBRU, { sync: true });
    const colorSnap = themeVarFBRSSnap[field];
    const color = varFBRU[field];

    const colorBoxProps: ColorBoxProps = {
        varName: colorSnap?.varName || '',
        varValue: colorSnap?.varValue || '',
        isUndefined: !colorSnap?.varValue && !isBackOrFore && (varFBRU.b?.isHsl || varFBRU.f?.isHsl),
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

export function GridRow({ varFBRU }: { varFBRU: VarFBRU; }) {
    return (<>
        <div className="mr-4 text-sm text-foreground/70 dark:text-foreground/50 flex items-center">
            {varFBRU.b?.varName || varFBRU.f?.varName}
        </div>

        <ValueInputAndBox varFBRU={varFBRU} field={'b'} isBackOrFore={true} />
        <ValueInputAndBox varFBRU={varFBRU} field={'f'} />
    </>);
}

//TODO: add preview foregraound over background
