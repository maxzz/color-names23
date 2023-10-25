import { HTMLAttributes, SetStateAction } from "react";
import { a, useSpring } from "@react-spring/web";
import { classNames } from "@/utils";

type SwitchCellProps = {
    label: string;
    toLeft: boolean;
    active: boolean;
    setActive: () => void;
};

const shadowLightClasses = "shadow-[inset_1px_2px_5px_0px_#0004,inset_-0px_-2px_2px_0px_#fffa]";
const shadowDarkClasses = "dark:shadow-[inset_2px_2px_5px_0.2px_#000000,inset_-0px_-2px_2px_0px_#e6e6e638]";
const shadowClasses = `${shadowLightClasses} ${shadowDarkClasses} opacity-50`; //TODO: opacity should go to a separate div, not to text

function SwitchCell({ label, active, toLeft, setActive, className, ...rest }: SwitchCellProps & HTMLAttributes<HTMLDivElement>) {
    const styles = useSpring({
        from: {
            transform: `scale(0, 1)`,
            opacity: 0,
        },
        to: {
            transform: `scale(${active ? 0 : 1}, 1)`,
            opacity: 1,
        },
        config: { duration: !active ? 150 : 0 }
    });
    return (
        <div
            className={classNames(
                "relative px-2 py-2 flex-0 flex items-end z-10",
                active ? "bg-background font-bold" : shadowClasses,
                // TODO: substitute font-bold with alternative solution
                className,
            )}
            onClick={setActive}
            {...rest}
        >
            {label}

            <a.div style={styles} className={`absolute inset-0 ${toLeft ? 'origin-right' : 'origin-left'} bg-muted-foreground/40 dark:bg-muted-foreground/50`}></a.div>
        </div>
    );
}

const SwitchClasses = "\
relative \
max-w-fit \
text-xs \
bg-secondary \
ring-1 \
ring-muted-foreground/70 \
overflow-hidden \
rounded shadow select-none cursor-pointer \
flex items-center justify-between";

type SwitchProps = {
    on: boolean;
    setOn: (v: SetStateAction<boolean>) => void;
    labels: [string, string];
    titles: [string, string];
};

export function Switch({ className, on, setOn, labels, titles }: SwitchProps & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(SwitchClasses, className)}>
            <SwitchCell
                label={labels[0]}
                title={titles[0]}
                toLeft={false}
                active={on}
                setActive={() => setOn((v) => !v)}
            />
            <SwitchCell
                label={labels[1]}
                title={titles[1]}
                className="border-l border-muted-foreground/70"
                toLeft={true}
                active={!on}
                setActive={() => setOn((v) => !v)}
            />
        </div>
    );
}
