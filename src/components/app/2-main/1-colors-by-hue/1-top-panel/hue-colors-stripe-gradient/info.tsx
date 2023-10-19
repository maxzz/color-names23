import { HTMLAttributes } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { viewHueAtoms } from '@/store';
import { classNames } from '@/utils';

export function HueToleranceInfo({ className }: HTMLAttributes<HTMLDivElement>) {
    const [hue, setHue] = useAtom(viewHueAtoms.hueAtom); //TODO: const [localHue, setLocalHue] = useState(0);
    const tolerance = useAtomValue(viewHueAtoms.toleranceAtom);
    return (
        <div className={classNames("text-xs flex", className)}>
            <div className="mr-2">
                Tolerance: {tolerance}
            </div>

            <div className="mr-1">
                Hue:
            </div>

            <input
                className="w-6 text-center outline-none bg-muted focus:bg-border focus:ring-2 rounded"
                value={hue}
                onChange={(e) => {
                    const v = +e.target.value;
                    !isNaN(v) && setHue(v % 360);
                }}
            />
        </div>
    );
}
