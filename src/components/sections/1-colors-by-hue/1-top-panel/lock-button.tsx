import { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { a, easings, useSpring, useTransition } from '@react-spring/web';
import { viewHueAtoms } from '@/store';
import { classNames } from '@/utils';
import { Button } from '@/components/ui/shadcn';

function IconMovingLock({ open, className, ...rest }: { open: boolean; } & React.SVGAttributes<SVGSVGElement>) {
    const styles = useSpring({
        open: open ? 1 : 0,
        x: open ? 18.5 : 0,
        rotateY: open ? 180 : 0,
        config: { duration: 150 },
    });
    return (
        <svg className={classNames("stroke-current stroke-[1] fill-transparent", className)} viewBox="0 0 24 24" {...rest}>
            <a.path
                style={styles}
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
            className={classNames("px-0 h-auto rounded-none self-center overflow-hidden flex", className)}
            onClick={() => setLocked((v) => !v)}
            title="Lock/Unlock inactive colors saturation"
        >
            <IconMovingLock className="w-4 h-4" open={locked} />
        </Button>
    );
}
