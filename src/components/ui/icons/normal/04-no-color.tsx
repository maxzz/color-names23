import { HTMLAttributes, SVGProps } from "react";

export function IconNoColor(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}

            {/* <path d="M0 .01h4v4H0z" />
            <path d="M4 4.01h4v4H4z" />
            <path d="M8 .01h4v4H8z" />
            <path d="M12 4.01h4v4h-4z" />
            <path d="M16 .01h4v4h-4z" />
            <path d="M20 4.01h4v4h-4z" />
            <path d="M4 20h4v4H4z" />
            <path d="M0 16h4v4H0z" />
            <path d="M4 12.01h4v4H4z" />
            <path d="M0 8.01h4v4H0z" />
            <path d="M8 8.01h4v4H8z" />
            <path d="M12 12.01h4v4h-4z" />
            <path d="M16 8.01h4v4h-4z" />
            <path d="M20 12.01h4v4h-4z" />
            <path d="M12 20h4v4h-4z" />
            <path d="M8 16h4v4H8z" />
            <path d="M16 16h4v4h-4z" />
            <path d="M20 20h4v4h-4z" /> */}

            {/* <path d="M0 0h12v11.99H0z" />
            <path d="M12 11.99h12V24H12z" /> */}

            <path d="M0 .02h6v6H0z" />
            <path d="M6 6.01h6v6H6z" />
            <path d="M12 .02h6v6h-6z" />
            <path d="M18 6.01h6v6h-6z" />
            <path d="M6 18.01h6v6H6z" />
            <path d="M0 12.01h6v6H0z" />
            <path d="M12 12.01h6v6h-6z" />
            <path d="M18 18.01h6v6h-6z" />
        </svg>
    );
}
