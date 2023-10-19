import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { viewHueAtoms } from '@/store';
import { HueSlider } from './hue-slider';
import { LockButton } from './lock-button';
import { HueToleranceInfo } from './info';
import { MountHueTransition } from './mount-transition';
import { classNames } from '@/utils';

export function HueColorsStripe(props: HTMLAttributes<HTMLDivElement>) {
    const mono = useAtomValue(viewHueAtoms.monoAtom);
    return (
        <div {...props}>
            <MountHueTransition show={!mono} className="flex flex-col gap-y-0.5 text-muted-foreground">

                <HueSlider className="w-full h-12 rounded" />

                <div className="flex items-center justify-between">
                    <LockButton />
                    <HueToleranceInfo />
                </div>

            </MountHueTransition>
        </div>

    );
}
