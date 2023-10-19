import { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { a, easings, useSpring, useTransition } from '@react-spring/web';
import { viewHueAtoms } from '@/store';
import { classNames } from '@/utils';
import { Button } from '@/components/ui/shadcn';

export const animationConfig = {
    //config: { mass: 0.2, tension: 692, clamp: true },
    config: { duration: 200 },
};

function IconMovingLock({ open, className, ...rest }: { open: boolean; } & React.SVGAttributes<SVGSVGElement>) {
    const styles = useSpring({
        open: open ? 1 : 0,
        ...animationConfig,
    });
    return (
        <svg className={classNames("stroke-current stroke-[1] fill-transparent", className)} viewBox="0 0 24 24" {...rest}>

            <a.path
                d={styles.open.to({
                    range: [0, 1],
                    output: ["M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75", "M4.5 10.5V6.75a4.5 4.5 0 119 0v3.75"],
                })}
            />

            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
        </svg>
    );
}

export function LockButton({ className }: HTMLAttributes<HTMLDivElement>) {
    const [locked, setLocked] = useAtom(viewHueAtoms.lockedAtom);
    return (
        <Button
            variant={'ghost'}
            size={'sm'}
            title="Lock/Unlock inactive colors saturation"
            className={classNames("px-0 h-auto rounded-none self-center flex", className)}
            // overflow-hidden
            onClick={() => setLocked((v) => !v)}
        >
            <IconMovingLock className="w-4 h-4" open={locked} />
        </Button>
    );
}
