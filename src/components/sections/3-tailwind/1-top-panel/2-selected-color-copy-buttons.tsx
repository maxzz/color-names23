import { CurrentTwColor } from '@/store';
import { CopyColorButton } from '@/components/ui/button-copy-color';

export function SelectedColorCopyButtons({ currentTwColor }: { currentTwColor: CurrentTwColor | null; }) {
    //TODO: show color value in hex, rgb, hsl
    return (<>
        {currentTwColor && (
            <CopyColorButton valueToCopy={currentTwColor.value.toUpperCase()} />
        )}
    </>);
}
