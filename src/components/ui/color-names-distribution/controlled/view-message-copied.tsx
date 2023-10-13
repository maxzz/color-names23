import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { colorToCopyState } from "./state";
import { classNames } from "@/utils";
import { a, easings, useSpring } from "@react-spring/web";

export function MessageHueColorCopied({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { text } = useSnapshot(colorToCopyState);
    const styles = useSpring({
        opacity: text ? 1 : 0,
        transform: text ? 'translateY(0)' : 'translateY(100%)',
        config: { easing: text ? easings.easeOutElastic : easings.linear, duration: text ? 1000 : 1400 },
        onRest: () => text && (colorToCopyState.text = ''),
    });
    return (
        <a.div style={styles} className={classNames("px-2 py-1 text-xs text-white bg-green-600 rounded flex items-center space-x-2", className)} {...rest}>
            <div className="w-4 h-4 border-green-800 border rounded" style={{backgroundColor: text}}></div>
            <div>Copied</div>
        </a.div>
    );
}
