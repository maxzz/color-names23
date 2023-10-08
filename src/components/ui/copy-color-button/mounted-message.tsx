import { HTMLAttributes } from "react";
import { a, easings, useTransition } from "@react-spring/web";

export function MountedMessage({ show, setShow, children }: { show: boolean; setShow?: (v: boolean) => void; } & HTMLAttributes<HTMLDivElement>) {
    const transitions = useTransition(Number(show), {
        from: { x: 0, opacity: 0, },
        enter: { x: 0, opacity: 1, },
        leave: {
            x: 20, opacity: 0,
            config: { duration: 400, easing: easings.easeOutQuad },
            onRest: ({ finished }) => show && finished && setShow?.(false)
        },
    });
    return transitions(
        (styles, item) => {
            if (!item) {
                return null;
            }
            return (
                <a.div style={styles}>
                    {children}
                </a.div>
            );
        }
    );
}
