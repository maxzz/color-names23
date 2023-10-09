import { HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { a, useSpring } from "@react-spring/web";
import { viewHueAtoms } from "@/store";
import { classNames } from "@/utils";

type MonoSwitchCellProps = {
    label: string;
    active: boolean;
    setValue: () => void;
};

function MonoSwitchCell({ label, active, setValue, className, ...rest }: MonoSwitchCellProps & HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={classNames(
                "px-2 py-2 flex-0 flex items-end z-10",
                active ? "bg-primary-100 font-bold" : "shadow-[inset_1px_2px_5px_0px_#0004,inset_-0px_-2px_2px_0px_#fffa] opacity-50",
                className,
            )}
            onClick={setValue}
            {...rest}
        >
            {label}
        </div>
    );
}

export function MonoSwitch({ className }: HTMLAttributes<HTMLDivElement>) {
    const [mono, setMono] = useAtom(viewHueAtoms.monoAtom);
    const styles = useSpring({
        from: { x: '0%', },
        to: { x: mono ? '0%' : '100%', },
        config: { duration: 150 }
    });
    return (
        <div
            className={classNames(
                "max-w-fit relative bg-primary-300 ring-1 ring-primary-400 rounded text-xs shadow select-none cursor-pointer overflow-hidden",
                className,
            )}
        >
            <div className="flex">
                <MonoSwitchCell label="Mono" title="Monochrome" active={mono} setValue={() => setMono((v) => !v)} />
                <MonoSwitchCell label="Color" title="Hue" className="border-l border-primary-400" active={!mono} setValue={() => setMono((v) => !v)} />
            </div>

            <a.div style={styles} className={classNames("absolute bottom-0 w-1/2 h-full bg-primary-400/40")} />
        </div>
    );
}
