import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { a, easings, useSpring } from "@react-spring/web";
import { colorToCopyState } from "./ui-state";
import { classNames } from "@/utils";

export function MessageHueColorCopied({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {

    const { colorName: snapText } = useSnapshot(colorToCopyState);
    const isString = typeof snapText === 'string';

    const text = isString ? snapText : snapText.simpleText;

    const styles = useSpring({
        opacity: snapText ? 1 : 0,
        transform: snapText ? 'translateY(0)' : 'translateY(100%)',
        config: { easing: snapText ? easings.easeOutElastic : easings.linear, duration: snapText ? 1000 : 400 },
        onRest: () => snapText && (colorToCopyState.colorName = ''),
    });

    const bkg = isString ? { backgroundColor: snapText } : undefined;
    const msgClasses = isString ? 'w-4 h-4' : "text-foreground";

    return (
        <a.div style={styles} className={classNames("px-2 py-1 text-xs text-white bg-green-600 rounded flex items-center space-x-2", className)} {...rest}>
            <div
                className={`border-green-800 ${isString && snapText ? 'border' : ''} ${msgClasses} rounded`}
                style={bkg}
                children={isString ? undefined : text}
            />

            <div>
                Copied
            </div>
        </a.div>
    );
}
