import { HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { a, useSpring } from "@react-spring/web";
import { viewHueAtoms } from "@/store";
import { classNames } from "@/utils";

type MonoSwitchCellProps = {
    label: string;
    toLeft: boolean;
    active: boolean;
    setActive: () => void;
};

const shadowClasses = "shadow-[inset_1px_2px_5px_0px_#0004,inset_-0px_-2px_2px_0px_#fffa] opacity-50";

function MonoSwitchCell({ label, active, toLeft, setActive, className, ...rest }: MonoSwitchCellProps & HTMLAttributes<HTMLDivElement>) {
    const styles = useSpring({
        from: { x: toLeft ? '100%' : '-100%', opacity: 0, },
        to: {
            x: active ? toLeft ? '100%' : '-100%' : '0%',
            // x: toLeft
            //     ? active ? '100%': '0%'
            //     : active ? '-100%': '0%',
            opacity: 1,
            // opacity: toLeft
            //     ? active ? 1 : 0
            //     : active ? 0 : 1,
        },
        //config: { duration: !active ? 1250 : 0 }
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

            <a.div style={styles} className="absolute top-0 left-0 w-full h-full bg-red-500/60"></a.div>
        </div>
    );
}

const MonoSwitchClasses = "max-w-fit relative bg-secondary ring-1 ring-primary-400 rounded text-xs shadow select-none cursor-pointer overflow-hidden";

export function MonoSwitch({ className }: HTMLAttributes<HTMLDivElement>) {
    const [mono, setMono] = useAtom(viewHueAtoms.monoAtom);
    const styles = useSpring({
        from: { x: '0%', },
        to: { x: mono ? '-100%' : '100%', },
        config: { duration: 1250 }
    });
    return (
        <div className={classNames(MonoSwitchClasses, className)}>
            <div className="flex">
                <MonoSwitchCell
                    label="Mono"
                    title="Monochrome"
                    toLeft={false}
                    active={mono}
                    setActive={() => setMono((v) => !v)}
                />
                <MonoSwitchCell
                    label="Color1111111............11"
                    title="Hue"
                    className="border-l border-primary-400"
                    toLeft={true}
                    active={!mono}
                    setActive={() => setMono((v) => !v)}
                />
            </div>

            {/* <a.div
                style={styles}
                className={classNames("absolute bottom-0 w-1/2 h-full bg-muted-foreground/40")}
            /> */}
        </div>
    );
}
