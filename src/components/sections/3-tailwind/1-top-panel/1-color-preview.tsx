import { useAtomValue } from 'jotai';
import { currentTwColorAtom } from '@/store';
import { isLightColor } from '@/utils-color';

export function PreviewBox() {
    const currentTwColor = useAtomValue(currentTwColorAtom);
    const txtColor = { color: currentTwColor ? isLightColor(currentTwColor.value) ? 'black' : 'white' : '' };
    return (
        <div
            className="flex-none w-24 h-16 text-xs border-primary-400 border rounded flex transition-colors"
            style={{ backgroundColor: currentTwColor?.value || 'transparent' }}
        >
            {currentTwColor &&
                <div className="flex-1 px-1.5 py-0.5 flex items-end justify-between">
                    <div className="transition-colors" style={txtColor}>
                        {currentTwColor.group}
                    </div>
                    <div className="transition-colors" style={txtColor}>
                        {currentTwColor.key}
                    </div>
                </div>
            }
        </div>
    );
}
