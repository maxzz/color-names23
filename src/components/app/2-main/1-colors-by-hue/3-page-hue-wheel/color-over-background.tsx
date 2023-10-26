import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { colorOverBackground } from "@/store";
import { classNames } from "@/utils";

export function ColorOverBackground({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorOverBackground)
    return (
        <div className={classNames(className)} {...rest}>
            ColorOverBackground
        </div>
    );
}
