import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import useMeasure from 'react-use-measure';
import { currentTwColorAtom } from '@/store';
import { classNames } from '@/utils';
import { ColorPreviewBox } from './1-color-preview';
import { SelectedColorCopyButtons } from './2-selected-color-copy-buttons';
import { PaletteName } from './3-palette-name';
import { RowPalette } from './4-row-palette';

export function TopPanel({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const currentTwColor = useAtomValue(currentTwColorAtom);
    const [ref, { width: containerWidth }] = useMeasure();
    return (
        <div ref={ref} className={classNames("px-4 py-2 h-64", className)} {...rest}>

            <PaletteName currentTwColor={currentTwColor} />

            {/* Low container */}
            <div className="flex items-start justify-between space-x-4 text-sm">

                {/* Preview and color copy buttons */}
                <div className={`flex ${containerWidth < 700 ? "flex-col space-x-0" : "flex-row space-x-2"}`}>
                    <ColorPreviewBox />
                    <SelectedColorCopyButtons currentTwColor={currentTwColor} />
                </div>

                {/* Row */}
                <div className="flex-1 max-w-[400px]">
                    {currentTwColor &&
                        <RowPalette groupName={currentTwColor.group} />
                    }
                </div>
            </div>

        </div>
    );
}
