import { useAtomValue } from 'jotai';
import { viewHueAtoms } from '@/store';
import { formatHSL, formatRGB } from '@/utils-color';
import { ColorNamespaceButton } from './single-button';

export function CurrentColorValues() {
    const color = useAtomValue(viewHueAtoms.colorAtom);
    const borderColor = () => color ? color.dark ? 'white' : 'black' : 'transparent';
    return (
        <div
            className="relative flex-1 p-1 w-24 h-24 border-primary-400 border rounded flex items-center"
            style={{
                backgroundColor: `${color ? color.hex : 'transparent'}`,
                color: borderColor(),
                borderColor: borderColor()
            }}
        >
            {/* <CopyHueNotice /> */}
            {color &&
                <div className="px-1 pb-1 flex flex-col text-xs">
                    <ColorNamespaceButton copyValue={color.name} />
                    <ColorNamespaceButton copyValue={color.hex} />
                    <ColorNamespaceButton copyValue={formatRGB(color.rgb)} />
                    <ColorNamespaceButton copyValue={formatHSL(color.hsl)} />
                </div>
            }
        </div>
    );
}
