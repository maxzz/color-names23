import { HTMLAttributes } from 'react';
import { a, easings, useTransition } from '@react-spring/web';

export function MountHueTransition({ show, setShow, ...rest }: { show: boolean; setShow?: (v: boolean) => void; } & HTMLAttributes<HTMLDivElement>) {

    const transitions = useTransition(Number(show), {
        from: { y: -20, opacity: 0, },
        enter: { y: 0, opacity: 1, },
        leave: {
            y: -20, opacity: 0,
            config: { duration: 200, easing: easings.easeOutQuad },
            onRest: ({ finished }) => show && finished && setShow?.(false)
        },
    });
    
    return transitions((styles, item) => (
        item
            ? <a.div style={styles} {...rest} />
            : null
    ));
}
