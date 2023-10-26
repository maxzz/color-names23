import { useAtomValue } from 'jotai';
import { CurrentTwColor, currentTwColorAtom } from '@/store';
import { isRgbColorLight } from '@/utils';

function Box({ currentTwColor }: { currentTwColor: CurrentTwColor; }) {
    const isLight = isRgbColorLight(currentTwColor.value);
    const colorClasses = `transition-colors duration-[.5s] ${isLight ? 'text-black' : 'text-white'}`;
    return (
        <div className={`flex-1 px-1.5 py-0.5 flex items-end justify-between ${colorClasses}`}>
            <div>
                {currentTwColor.group}
            </div>
            <div>
                {currentTwColor.key}
            </div>
        </div>
    );
}

export function ColorPreviewBox() {
    const currentTwColor = useAtomValue(currentTwColorAtom);
    return (
        <div
            className="flex-none w-24 h-16 text-xs font-bold border-primary-400 border rounded flex transition-colors"
            style={{ backgroundColor: currentTwColor?.value || 'transparent' }}
        >
            {currentTwColor && <Box currentTwColor={currentTwColor} />}
        </div>
    );
}
