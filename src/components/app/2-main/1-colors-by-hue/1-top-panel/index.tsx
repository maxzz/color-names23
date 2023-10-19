import { MonoSwitch } from './mono-color-switch';
import { HueColorsStripe } from './hue-colors-stripe';
import { CurrentColorValues } from './color-namespace-buttons';
import { WheelSwitch } from './linear-wheel-switch';
import { useAtomValue } from 'jotai';
import { viewHueAtoms } from '@/store';

export function TopPanel() {
    const linear = useAtomValue(viewHueAtoms.linearAtom);
    return (
        <div className="h-64 bg-secondary border-border border-b">

            <div className="mx-auto p-4 pt-4 max-w-[42rem] flex items-center justify-between">
                <WheelSwitch />
            </div>

            {linear &&
                <div>
                    {/* TODO:  button selector should be 'hue colors' instead of 'hue groups' and 'hue wheel' */}
                    <div className="mx-auto p-4 pt-0 max-w-[42rem] grid grid-cols-[90px,minmax(0,1fr),90px] grid-rows-[auto,1fr] gap-x-4">

                        <HueColorsStripe className="col-span-full h-16" />

                        <MonoSwitch className="col-start-3 row-start-2 place-self-start justify-self-end" />
                        {/* TODO: add spikes */}

                        <div className="col-start-2 flex items-center space-x-4 text-sm">
                            <CurrentColorValues />
                        </div>

                    </div>
                </div>
            }
        </div>
    );
}

//TODO: add tailwind palettes - done
//TODO: add input element for exact hue value - done
//TODO: add control to enlarge/shrink hue slider - no need
//TODO: add control to dim on/off hue slider
//TODO: add dark/light mode
