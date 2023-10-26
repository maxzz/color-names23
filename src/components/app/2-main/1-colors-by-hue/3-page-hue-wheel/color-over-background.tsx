import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function ColorOverBackground({className, ...rest}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(className)} {...rest}>
            ColorOverBackground
        </div>
    );
}
