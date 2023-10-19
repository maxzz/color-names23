import { useAtomValue } from 'jotai';
import { viewHueAtoms } from '@/store';
import { CopyColorButton } from '@/components/ui/button-copy-color';
import { formatHSL, formatRGB } from '@/utils-color';

const copyHueNoticeTextShadow = {
    textShadow: '#98989887 1px 1px, #4141412e -1px -1px 0px'
};

function CopyHueNotice() {
    return (
        // <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
            <div className="px-2 py-px text-sm bg-green-500 text-green-900 border-green-700 border rounded" style={copyHueNoticeTextShadow}>
                Copied
            </div>
        </div>
    );
}

function ColorNamespaceButton({ copyValue }: { copyValue: string; }) {
    return (
        <div className="h-5">
            <CopyColorButton valueToCopy={copyValue} copyNotice={<CopyHueNotice />} />
        </div>
    );
}

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
                <div className="flex flex-col text-xs">
                    <ColorNamespaceButton copyValue={color.name} />
                    <ColorNamespaceButton copyValue={color.hex} />
                    <ColorNamespaceButton copyValue={formatRGB(color.rgb)} />
                    <ColorNamespaceButton copyValue={formatHSL(color.hsl)} />
                </div>
            }
        </div>
    );
}
