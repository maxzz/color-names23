import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { viewListAtoms } from '@/store';
import { SelectedColorInfoPanel } from './1-selected-color';
import { ColorNeighborsGrid } from './2-color-neighbors-grid';
import { classNames } from '@/utils';

export function Section1_ColorsByHue({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    useAtomValue(viewListAtoms.sortByAtom);
    return (
        <div className={classNames("flex flex-col", className)} {...rest}>
            <SelectedColorInfoPanel />
            <div className="flex-1 p-4 grid place-items-center">
                <ColorNeighborsGrid />
            </div>
        </div>
    );
}
