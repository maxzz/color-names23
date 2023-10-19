import { HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { viewHueAtoms } from "@/store";
import { Switch } from "@/components/ui";

export function WheelSwitch(props: HTMLAttributes<HTMLDivElement>) {
    const [on, setOn] = useAtom(viewHueAtoms.linearAtom);
    return (
        <Switch on={on} setOn={setOn} labels={['Linear', 'Circular']} titles={['Show linear selector', 'Show circular selector']} {...props} />
    );
}
