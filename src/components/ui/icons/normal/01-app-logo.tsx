import { classNames } from "@/utils";
import { HTMLAttributes, SVGProps } from "react";

export function IconPalette(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, className, ...rest } = props;
    return (
        <svg viewBox="0 0 24 24" className={classNames("fill-none stroke-current stroke-[1.5]", className)} {...rest}>
            {title && <title>{title}</title>}
            <path d="M22.66 12.11V12A10.66 10.66 0 1 0 12 22.66h.44c1.32-.05 2.22-1.25 2.22-2.58 0-.6-.25-1.18-.5-1.75-.18-.41-.36-.82-.45-1.25a2 2 0 0 1 1.96-2.41h4.08c1.52 0 2.9-1.03 2.92-2.55Z" />
            <circle cx="5.67" cy="13.67" r="1.67" />
            <circle cx="7" cy="8.34" r="1.67" />
            <circle cx="12.33" cy="5.67" r="1.67" />
            <circle cx="17.66" cy="8.34" r="1.67" />
        </svg>
    );
}
