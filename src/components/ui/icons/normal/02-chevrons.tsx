import { classNames } from '@/utils';
import { HTMLAttributes, SVGAttributes } from 'react';

export function IconChevronUp({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="M5.843 15.407L11.5 9.75l5.657 5.657l-.707.707l-4.95-4.95l-4.95 4.95l-.707-.707z" />
        </svg>
    );
}

export function IconChevronDown({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current", className)} viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M5.843 9.593L11.5 15.25l5.657-5.657l-.707-.707l-4.95 4.95l-4.95-4.95l-.707.707z" />
        </svg>
    );
}
