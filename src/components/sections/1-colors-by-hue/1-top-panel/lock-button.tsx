import { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { a, easings, useSpring, useTransition } from '@react-spring/web';
import { viewHueAtoms } from '@/store';
import { classNames } from '@/utils';
import { IconLockLocked, IconLockSeparated } from '@/components/ui/icons/normal';
import { Button } from '@/components/ui/shadcn';

export function LockButton({ className }: HTMLAttributes<HTMLDivElement>) {
    const [locked, setLocked] = useAtom(viewHueAtoms.lockedAtom);
    
    // const transitions = useTransition(locked, {
    //     from: { x:0, opacity: 0, 
    //  },
    //     enter: { x:0, opacity: 1, 
    //  },
    //     leave: { x:0, opacity: 0, 
    //         config: { duration: 0, easing: easings.easeOutQuad },
    //         //config: { duration: 200, easing: easings.easeOutQuad },
    //     },
    // });

    const transitions = useTransition(Boolean(locked), {
        from: {
            opacity: 0,
            transform: 'translateX(200%) rotateY(180deg)',
        },
        enter: {
            opacity: 1,
            transform: 'translateX(0%) rotateY(0deg)',
        },
        leave: {
            opacity: 0,
            transform: 'translateX(-200%) rotateY(0deg)',
        },
        config: { duration: 200, easing: easings.easeOutQuad },
    });

    return (
        <Button
            variant={'ghost'}
            size={'sm'}
            title="Lock/Unlock inactive colors saturation"
            className={classNames("px-0 h-auto rounded-none self-center flex", className)}
            // overflow-hidden
            onClick={() => setLocked((v) => !v)}
        >
            <UIIconUpDown className="w-4 h-4" open={locked} />
            {/* {transitions((styles, item) => (
                item
                    ? <a.div style={styles}> <IconLockLocked className="w-3 h-3" /> </a.div>
                    : <a.div style={styles}> <IconLockSeparated className="w-5 h-5 overflow-visible" /> </a.div>
            ))} */}
            {/* {transitions((styles, item) => (
                item
                    ? <a.div style={styles}> <IconLockLocked className="w-3 h-3" /> </a.div>
                    : <a.div style={styles}> <IconLockSeparated className="w-5 h-5 overflow-visible" /> </a.div>
            ))} */}
        </Button>
    );
}

export const animationConfig = {
    //config: { mass: 0.2, tension: 692, clamp: true },
    config: { duration: 200 },
};

export function UIIconUpDown({ open, className, ...rest }: { open: boolean; } & React.SVGAttributes<SVGSVGElement>) {
    const styles = useSpring({ open: open ? 1 : 0, ...animationConfig });
    return (
        <svg className={classNames("stroke-current stroke-[1] fill-transparent", className)} viewBox="0 0 24 24" {...rest}>
            {/* <a.path d={styles.open.to({ range: [0, 1], output: ["M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75", "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75"] })} /> */}
            <a.path d={styles.open.to({ range: [0, 1], output: ["M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75", "M4.5 10.5V6.75a4.5 4.5 0 119 0v3.75"] })} />

            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />

        </svg>
    );
}

// transform: 'translate3d(100%,0,50%)',
// transform: 'translate3d(0%,0,0)',
// transform: 'translate3d(-200%,0,50%)',

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
