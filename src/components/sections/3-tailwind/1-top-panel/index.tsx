import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import useMeasure from 'react-use-measure';
import { currentTwColorAtom } from '@/store';
import { classNames } from '@/utils';
import { PreviewBox } from './1-color-preview';
import { SelectedColorValue } from './2-selected-color-copy-buttons';
import { RowPalette } from './3-row-palette';

export function TopPanel({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const currentTwColor = useAtomValue(currentTwColorAtom);
    const [ref, { width: containerWidth }] = useMeasure();
    return (
        <div ref={ref} className={classNames("px-4 py-2 h-64", className)} {...rest}>

            {/* Palette name */}
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

            {/* Low container */}
            <div className="flex items-start justify-between space-x-4 text-sm">

                {/* Preview and color value */}
                <div className={classNames("flex", containerWidth < 700 ? "flex-col space-x-0" : "flex-row space-x-2")}>
                    <PreviewBox />
                    <SelectedColorValue currentTwColor={currentTwColor} />
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
