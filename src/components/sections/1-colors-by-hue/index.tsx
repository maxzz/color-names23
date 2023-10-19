import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { viewHueAtoms, viewListAtoms } from '@/store';
import { TopPanel } from './1-top-panel';
import { ColorNeighborsGrid } from './2-color-neighbors-grid';
import { classNames } from '@/utils';

export function Section1_ColorsByHue({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    useAtomValue(viewListAtoms.sortByAtom);
    const linear = useAtomValue(viewHueAtoms.linearAtom);
    return (
        <div className={classNames("flex flex-col", className)} {...rest}>
            <TopPanel />

            {linear &&
                <div className="flex-1 p-4 grid place-items-center">
                    <ColorNeighborsGrid />
                </div>
            }
        </div>
    );
}
