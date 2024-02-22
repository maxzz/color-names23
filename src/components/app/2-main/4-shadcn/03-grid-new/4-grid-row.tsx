import { useSnapshot } from "valtio";
import { FBRUKey, VarFBRUa, fbruKey } from "@/store";
import { ColorInput } from "./2-color-input";
import { ColorBox, ColorBoxProps } from "./3-color-box";

type ValueInputAndBoxProps = {
    varFBRU: VarFBRUa;
    field: FBRUKey;
    isBackOrFore?: boolean;
};

function ValueInputAndBox({ varFBRU, field, isBackOrFore }: ValueInputAndBoxProps) {
    const themeVarFBRSSnap = useSnapshot(varFBRU, { sync: true });
    const colorSnap = themeVarFBRSSnap[fbruKey[field]];
    const color = varFBRU[fbruKey[field]];
    const isHslDefiend = varFBRU.some((v) => v?.isHsl);

    const colorBoxProps: ColorBoxProps = {
        varName: colorSnap?.varName || '',
        varValue: colorSnap?.varValue || '',
        isUndefined: !colorSnap?.varValue && !isBackOrFore && isHslDefiend,
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

export function GridRow({ varFBRU }: { varFBRU: VarFBRUa; }) {
    const varFBRUName = varFBRU.find((v) => v)?.varName || 'NONAME';
    return (<>
        <div className="mr-4 text-sm text-foreground/70 dark:text-foreground/50 flex items-center">
            {varFBRUName}
        </div>

        <ValueInputAndBox varFBRU={varFBRU} field={'b'} isBackOrFore={true} />
        <ValueInputAndBox varFBRU={varFBRU} field={'f'} />
    </>);
}

//TODO: add preview foregraound over background
