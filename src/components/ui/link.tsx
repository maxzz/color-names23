import { AnchorHTMLAttributes } from 'react';
import { linkClasses } from './shared-styles';

export function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a className={linkClasses} target="_blank" {...props} />
    );
}
