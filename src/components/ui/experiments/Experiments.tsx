import { UISwitch } from './swtches/UISwitch';
import { UISwitch as UIRadixSwitch } from './UiSwitch';
import { UISwitchCheck } from './swtches/UISwitchCheck';
import { UISwitchRadio } from './swtches/UISwitchRadio';

import { UICoffeAnimation } from './coffe-animation/UICoffeAnimation';
import { useState } from 'react';

export function Experiments() {
    const [v, setV] = useState(false);
    return (
        <div className="my-8 flex flex-col space-y-4">
            <div className="">
                <UICoffeAnimation />
            </div>

            <div className="px-4 flex space-x-4">
                <UISwitch />
                <UISwitchCheck />
                <UISwitchRadio />
            </div>

            <UIRadixSwitch className="data-state-checked:bg-red-400" value={v} onChange={(checked) => setV((v) => !v)} />
        </div>
    );
}
