import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { viewHueAtoms } from '@/store';
import { TopPanel } from './1-top-panel';
import { PageColorNeighborsGrid } from './2-page-linear-grid';
import { PageHueWheel } from './3-page-hue-wheel';
import { classNames } from '@/utils';

export function Section1_ColorsByHue({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const linear = useAtomValue(viewHueAtoms.linearAtom);
    return (
        <div className={classNames("flex flex-col", className)} {...rest}>
            <TopPanel />

            {linear &&
                <div className="flex-1 overflow-hidden">
                    <div className="p-4 w-full h-full grid place-items-center overflow-auto smallscroll">
                        <PageColorNeighborsGrid />
                    </div>
                </div>
            }

            {!linear &&
                <div className="flex-1 grid place-items-center overflow-hidden">
                    <PageHueWheel className="w-full h-full" />
                </div>
            }

        </div>
    );
}

//TODO: alt+click over color to copy 'background: darkgreen; color:lavender'
//TODO: fix gray scale as color over background
//TODO: allow to select any non-named color from wheel

//TODO: add bold text on color over background preview
//TODO: in the left-lower corner show the color name and backround copy text and button to copy

//TODO: search by color name or show all color names at once
//TODO: when color name is too long, we overlap the wheel and can't select the color; move color display (or just devtools info) to the bottom of the screen
