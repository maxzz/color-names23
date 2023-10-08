import { HTMLAttributes } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { a, easings, useTransition } from '@react-spring/web';
import { viewHueAtoms } from '@/store';
import { HueSlider } from './hue-slider';
import { classNames } from '@/utils';

function HueToleranceInfo({ className }: HTMLAttributes<HTMLDivElement>) {
    const [hue, setHue] = useAtom(viewHueAtoms.hueAtom); //TODO: const [localHue, setLocalHue] = useState(0);
    const tolerance = useAtomValue(viewHueAtoms.toleranceAtom);
    return (
        <div className={classNames("text-xs flex", className)}>
            <div className="mr-2">Tolerance: {tolerance}</div>

            {/* <div className="">Hue: {hue}</div> */}

            <div className="mr-1">Hue:</div>
            <input
                className="w-6 text-center outline-none bg-primary-100 focus:bg-primary-100 focus:ring-2 rounded"
                value={hue}
                onChange={(e) => {
                    const v = +e.target.value;
                    !isNaN(v) && setHue(v % 360);
                }}
            />
        </div>
    );
}

function MountHue({ show, setShow, children }: { show: boolean; setShow?: (v: boolean) => void; } & HTMLAttributes<HTMLDivElement>) {
    const transitions = useTransition(Number(show), {
        from: { y: -20, opacity: 0, },
        enter: { y: 0, opacity: 1, },
        leave: { y: -20, opacity: 0, config: { duration: 200, easing: easings.easeOutQuad }, onRest: ({ finished }) => show && finished && setShow?.(false) },
    });
    return transitions((styles, item) => item ? <a.div style={styles}> {children} </a.div> : null);
}

export function ColorStripe() {
    const mono = useAtomValue(viewHueAtoms.monoAtom);
    return (
        <div className={`col-span-2 h-16 flex flex-col justify-center`}>
            <MountHue show={!mono}>
                <div className="flex justify-end">
                    <HueToleranceInfo />
                </div>
                <HueSlider />
            </MountHue>
        </div>

    );
}
