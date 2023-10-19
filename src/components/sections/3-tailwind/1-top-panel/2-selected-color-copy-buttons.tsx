import { CurrentTwColor } from '@/store';
import { CopyColorButton } from '@/components/ui/copy-color-button';

export function SelectedColorValue({ currentTwColor }: { currentTwColor: CurrentTwColor | null; }) {
    //TODO: show color value in hex, rgb, hsl
    return (<>
        {currentTwColor && (
            <CopyColorButton valueToCopy={currentTwColor.value.toUpperCase()} />
        )}
    </>);
}
