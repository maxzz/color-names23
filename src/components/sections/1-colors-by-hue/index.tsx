import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { viewHueAtoms } from '@/store';
import { TopPanel } from './1-top-panel';
import { ColorNeighborsGrid } from './2-color-neighbors-grid';
import { classNames } from '@/utils';
import { Section5_HueWheel } from '../5-hue-wheel';

export function Section1_ColorsByHue({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const linear = useAtomValue(viewHueAtoms.linearAtom);
    return (
        <div className={classNames("flex flex-col", className)} {...rest}>
            <TopPanel />

            {linear &&
                <div className="flex-1 p-4 grid place-items-center">
                    <ColorNeighborsGrid />
                </div>
            }

            {!linear &&
                <div className="h-full flex flex-col">
                    <Section5_HueWheel className="flex-1" />
                </div>
            }

        </div>
    );
}
