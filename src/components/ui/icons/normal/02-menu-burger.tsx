import { classNames } from "@/utils";
import { HTMLAttributes, SVGProps } from "react";

export function IconMenuBurger(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { className, title, ...rest } = props;
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    );
}
