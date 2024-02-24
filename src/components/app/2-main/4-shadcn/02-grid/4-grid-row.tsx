import { useSnapshot } from "valtio";
import { FbruKey, Fbru, fbruKey } from "@/store";
import { ColorInput } from "./2-color-input";
import { ColorBox, ColorBoxProps } from "./3-color-box";

type ValueInputAndBoxProps = {
    fbru: Fbru;
    field: FbruKey;
    isBackOrFore?: boolean;
};

function ValueInputAndBox({ fbru, field, isBackOrFore }: ValueInputAndBoxProps) {
    const fbruSnap = useSnapshot(fbru, { sync: true });
    const colorSnap = fbruSnap[fbruKey[field]];
    const color = fbru[fbruKey[field]];
    const isHslDefiend = fbru.some((v) => v?.isHsl);

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

export function GridRow({ fbru }: { fbru: Fbru; }) {
    const varFBRUName = fbru.find((v) => v)?.varName || 'NONAME';
    return (<>
        <div className="mr-4 text-sm text-foreground/70 dark:text-foreground/50 flex items-center">
            {varFBRUName}
        </div>

        <ValueInputAndBox fbru={fbru} field={'b'} isBackOrFore={true} />
        <ValueInputAndBox fbru={fbru} field={'f'} />
    </>);
}

//TODO: add preview foregraound over background
