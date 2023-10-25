import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { viewHueAtoms } from '@/store';
import { HueSlider } from './hue-slider';
import { LockButton } from './lock-button';
import { HueToleranceInfo } from './info';
import { MountHueTransition } from './mount-transition';

export function HueColorsStripe(props: HTMLAttributes<HTMLDivElement>) {
    const mono = useAtomValue(viewHueAtoms.monoAtom);
    return (
        <div {...props}>
            <MountHueTransition show={!mono} className="flex flex-col gap-y-0.5 text-muted-foreground">

                <LockButton className="self-end pb-1" />

                <HueSlider className="w-full h-12 rounded" />

                <HueToleranceInfo className="self-end" />
            </MountHueTransition>
        </div>
    );
}
