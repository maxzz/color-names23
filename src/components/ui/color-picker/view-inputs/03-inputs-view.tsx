import { HTMLAttributes } from "react";
import { FormatMenu } from "./01-format-menu";
import { CurrentColor } from "./02-single-row";
import { classNames } from "@/utils";

export function ColorInputs({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("flex justify-between space-x-2", className)} {...rest}>
            <CurrentColor className="w-full self-center" />
            <FormatMenu />
        </div>
    );
}
