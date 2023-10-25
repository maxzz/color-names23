import { MonoSwitch } from './mono-color-switch';
import { HueColorsStripe } from './hue-colors-stripe-gradient';
import { CurrentColorValues } from './color-namespace-buttons';
import { WheelSwitch } from './linear-wheel-switch';
import { useAtomValue } from 'jotai';
import { viewHueAtoms } from '@/store';

export function TopPanel() {
    const linear = useAtomValue(viewHueAtoms.linearAtom);
    return (
        <div className="bg-secondary border-border border-b">            {/* flex-none h-64 */}

            <div className="mx-auto p-4 max-w-[42rem] flex flex-col">
                <WheelSwitch />

                {linear && (
                    <div className="grid grid-cols-[90px,minmax(0,1fr),90px] grid-rows-[auto,1fr] gap-x-4 gap-y-8">

                        <HueColorsStripe className="col-span-full h-16" />

                        <MonoSwitch className="col-start-3 row-start-2 place-self-start justify-self-end" />
                        {/* TODO: add spikes */}

                        <div className="col-start-2 flex items-center space-x-4 text-sm">
                            <CurrentColorValues />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
