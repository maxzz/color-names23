import { HTMLAttributes } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { a, easings, useSpring, useTransition } from '@react-spring/web';
import { viewHueAtoms } from '@/store';
import { HueSlider } from './hue-slider';
import { classNames } from '@/utils';
import { IconLockLocked, IconLockUnlocked } from '@/components/ui/icons/normal';
import { Button } from '@/components/ui/shadcn';

function HueToleranceInfo({ className }: HTMLAttributes<HTMLDivElement>) {
    const [hue, setHue] = useAtom(viewHueAtoms.hueAtom); //TODO: const [localHue, setLocalHue] = useState(0);
    const tolerance = useAtomValue(viewHueAtoms.toleranceAtom);
    return (
        <div className={classNames("text-xs flex", className)}>
            <div className="mr-2">Tolerance: {tolerance}</div>

            {/* <div className="">Hue: {hue}</div> */}

            <div className="mr-1">Hue:</div>
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

function LockButton({ className }: HTMLAttributes<HTMLDivElement>) {
    const [locked, setLocked] = useAtom(viewHueAtoms.lockedAtom);
    const transitions = useTransition(locked, {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)', },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)', },
        leave: { opacity: 0, transform: 'translate3d(-200%,0,0)',
            config: { duration: 200, easing: easings.easeOutQuad },
        },
    });
    return (
        <Button variant={'outline'} size={'sm'} className={classNames("w-12 px-0 py-0 self-center flex overflow-hidden", className)} onClick={() => setLocked((v) => !v)}>
            {transitions((styles, item) => (
                item
                    ? <a.div style={styles}> <IconLockLocked className="w-3 h-3" /> </a.div>
                    : <a.div style={styles}> <IconLockUnlocked className="w-3 h-3" /> </a.div>
            ))}
        </Button>
    );
}

// function LockButton({ className }: HTMLAttributes<HTMLDivElement>) {
//     const [locked, setLocked] = useAtom(viewHueAtoms.lockedAtom);
//     const transitions = useTransition(Number(locked), {
//         from: { y: '-100%', },
//         enter: { y: '0', },
//         leave: {
//             y: '-100%',
//             config: { duration: 200, easing: easings.easeOutQuad },
//         },
//     });
//     return (
//         <Button className={classNames("relative w-3 h-3 flex items-center justify-center", className)} onClick={() => setLocked((v) => !v)}>
//             {transitions((styles, item) => (
//                 item
//                     ? <a.div style={styles}> <IconLockLocked className="absolute left-0 top-0 w-3 h-3" /> </a.div>
//                     : <a.div style={styles}> <IconLockUnlocked className="absolute left-0 top-0 w-3 h-3" /> </a.div>
//             ))}
//         </Button>
//     );
// }

{/* <div
className={classNames(
    "w-3 h-3 flex items-center justify-center rounded-full cursor-pointer",
    locked ? "bg-primary-400" : "bg-background border border-border",
    className,
)}
onClick={() => setLocked((v) => !v)}
>
<div className="w-3 h-3">
    <IconLockLocked />
    <IconLockUnlocked />
</div>
</div> */}


export function ColorStripe() {
    const mono = useAtomValue(viewHueAtoms.monoAtom);
    const locked = useAtomValue(viewHueAtoms.lockedAtom);
    return (
        <div className={`col-span-2 h-16 text-muted-foreground flex flex-col justify-center`}>
            <MountHueTransition show={!mono}>

                <div className="flex items-center justify-between">
                    <LockButton />

                    <div className="flex justify-end">
                        <HueToleranceInfo />
                    </div>
                </div>

                <HueSlider />

            </MountHueTransition>
        </div>

    );
}

function MountHueTransition({ show, setShow, children }: { show: boolean; setShow?: (v: boolean) => void; } & HTMLAttributes<HTMLDivElement>) {
    const transitions = useTransition(Number(show), {
        from: { y: -20, opacity: 0, },
        enter: { y: 0, opacity: 1, },
        leave: {
            y: -20, opacity: 0,
            config: { duration: 200, easing: easings.easeOutQuad },
            onRest: ({ finished }) => show && finished && setShow?.(false)
        },
    });
    return transitions((styles, item) => item ? <a.div style={styles}> {children} </a.div> : null);
}
