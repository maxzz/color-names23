import { SVGAttributes } from 'react';
import { a, useSpring } from '@react-spring/web';
import { classNames } from '@/utils';

export function IconMovingLock({ open, className, ...rest }: { open: boolean; } & SVGAttributes<SVGSVGElement>) {
    const styles = useSpring({
        open: open ? 1 : 0,
        x: open ? 18.5 : 0,
        rotateY: open ? 180 : 0,
        config: { duration: 350 },
    });
    return (
        <svg className={classNames("stroke-current stroke-[1.5] fill-transparent", className)} viewBox="0 0 24 24" {...rest}>
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
