import { type CurrentTwColor } from '@/store';

export function PaletteName({ currentTwColor }: { currentTwColor: CurrentTwColor | null; }) {
    return (
        <div className="flex items-center justify-end text-center">
            {currentTwColor
                ? (
                    <div className="flex items-center text-base">
                        {currentTwColor.group}
                    </div>
                )
                : "Pick a color from the grid"
            }
        </div>
    );
}
