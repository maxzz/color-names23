import { HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { viewHueAtoms } from "@/store";
import { Switch } from "@/components/ui";

export function MonoSwitch(props: HTMLAttributes<HTMLDivElement>) {
    const [mono, setMono] = useAtom(viewHueAtoms.monoAtom);
    return (
        <Switch on={mono} setOn={setMono} labels={['Mono','Color']} titles={['Monochrome','Hue']} {...props} />
    );
}
