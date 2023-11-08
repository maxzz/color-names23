import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function PaletteSelector({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("flex space-x-2", className)} {...rest}>
        </div>
    );
}
