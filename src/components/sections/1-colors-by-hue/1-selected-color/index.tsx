import { MonoSwitch } from '../mono-color-switch';
import { ColorStripe } from './color-stripe';
import { ColorNamespaceButtons } from './color-namespace-buttons';

export function SelectedColorInfoPanel() {
    return (
        <div className="bg-primary-200 border-slate-400 border-b">
            <div className="mx-auto p-4 pt-1 max-w-[42rem] grid grid-cols-[minmax(0,1fr),auto] gap-x-4">

                <ColorStripe  />

                <div className="flex items-center space-x-4 text-sm">
                    <ColorNamespaceButtons />
                    {/* <ColorValueInfo /> */}
                </div>

                <MonoSwitch className="place-self-start" />
            </div>
        </div>
    );
}

//TODO: add tailwind palettes - done
//TODO: add input element for exact hue value - done
//TODO: add control to enlarge/shrink hue slider - no need
//TODO: add control to dim on/off hue slider
//TODO: add dark/light mode
