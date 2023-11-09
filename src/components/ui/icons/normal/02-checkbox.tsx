import { classNames } from '@/utils';
import { HTMLAttributes, SVGAttributes } from 'react';

export function IconCheckbox({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-2", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
        </svg>
    );
}
