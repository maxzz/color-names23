import { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { a, config, useTransition } from '@react-spring/web';
import { viewHueAtoms } from '@/store';
import { classNames } from '@/utils';
import { IconLockLocked, IconLockUnlocked } from '@/components/ui/icons/normal';
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

    const transitions = useTransition(Number(locked), {
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
        config: config.molasses,
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
