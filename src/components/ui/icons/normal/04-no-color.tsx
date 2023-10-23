import { HTMLAttributes, SVGProps } from "react";

export function IconNoColor(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h3v-3H3v3Zm5 0h3v-3H8v3Zm5 0h3v-3h-3v3Zm5 0h3v-3h-3v3ZM3 6h3V3H3v3Zm0 5h3V8H3v3Zm0 5h3v-3H3v3ZM8 6h3V3H8v3Zm0 5h3V8H8v3Zm0 5h3v-3H8v3Zm5-10h3V3h-3v3Zm0 5h3V8h-3v3Zm0 5h3v-3h-3v3Zm5-10h3V3h-3v3Zm0 5h3V8h-3v3Zm0 5h3v-3h-3v3Z"
            />
        </svg>
    );
}
