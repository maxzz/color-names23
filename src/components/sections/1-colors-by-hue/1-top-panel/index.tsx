import { MonoSwitch } from './mono-color-switch';
import { HueColorsStripe } from './hue-colors-stripe';
import { CurrentColorValues } from './color-namespace-buttons';

export function TopPanel() {
    return (
        <div className="bg-secondary border-border border-b">
            {/* TODO:  button selector should be 'hue colors' instead of 'hue groups' and 'hue wheel' */}
            <div className="mx-auto p-4 pt-2 max-w-[42rem] grid grid-cols-[90px,minmax(0,1fr),90px] gap-x-4">

                <MonoSwitch className="col-span-3 place-self-start justify-self-end" />
                {/* TODO: selector: linear/whell */}
                {/* TODO: add spikes */}

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
