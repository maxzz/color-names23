import { MonoSwitch } from '../mono-color-switch';
import { HueColorsStripe } from './color-stripe';
import { CurrentColorValues } from './color-namespace-buttons';

export function TopPanel() {
    return (
        <div className="bg-secondary border-border border-b">
            <div className="mx-auto p-4 pt-1 max-w-[42rem] grid grid-cols-[90px,minmax(0,1fr),90px] gap-x-4">

                <MonoSwitch className="place-self-start justify-self-end" />
                {/* TODO: selector: linear/whell */}

                <HueColorsStripe className="col-span-full h-16" />

                <div className="col-start-2 flex items-center space-x-4 text-sm">
                    <CurrentColorValues />
                </div>

            </div>
        </div>
    );
}

//TODO: add tailwind palettes - done
//TODO: add input element for exact hue value - done
//TODO: add control to enlarge/shrink hue slider - no need
//TODO: add control to dim on/off hue slider
//TODO: add dark/light mode
