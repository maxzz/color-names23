import { CurrentTwColor } from '@/store';
import { ButtonCopyColor } from '@/components/ui/button-copy-color';

export function SelectedColorCopyButtons({ currentTwColor }: { currentTwColor: CurrentTwColor | null; }) {
    //TODO: show color value in hex, rgb, hsl
    return (<>
        {currentTwColor && (
            <ButtonCopyColor valueToCopy={currentTwColor.value.toUpperCase()} />
        )}
    </>);
}
