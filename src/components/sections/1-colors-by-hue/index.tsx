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
                <div className="flex-1 p-4 grid place-items-center">
                    <PageColorNeighborsGrid />
                </div>
            }

            {!linear &&
                <div className="flex-1 p-4 grid place-items-center">
                    <PageHueWheel className="w-full h-full" />
                </div>
            }

        </div>
    );
}
